import passport from 'passport';
import local from 'passport-local';
import GithubStrategy from 'passport-github2';
import userModel from '../dao/mongo/Models/userModel.js';
import { createHash, validatePassword } from '../utils.js';
import dotenv from 'dotenv';

dotenv.config();

const LocalStrategy = local.Strategy;

const initializePassportStrategies = () => {
    passport.use(
    'register', 
        new LocalStrategy({ passReqToCallback: true, usernameField: 'email' },
            async (req, email, password, done) => {
                try {
                    const { first_name, last_name } = req.body;
                    const exists = await userModel.findOne({ email });
                    if (exists)
                        return done(null, false, { message: 'El usuario ya existe' });

                    const hashedPassword = await createHash(password);

                    const user = {
                    first_name,
                    last_name,
                    email,
                    password: hashedPassword,
                    };

                    const result = await userModel.create(user);
                    done(null, result);

                } catch (error) {
                    done(error);
                }
            }
        )
    );

    passport.use(
    'login',
        new LocalStrategy({ usernameField: 'email' },
            async (email, password, done) => {
                //Admin login
                if (email === 'admin@admin.com' && password === '123') {
                    const user = {
                        id: 0,
                        name: `Admin`,
                        role: 'admin',
                        email: '...',
                    };
                        return done(null, user);
                }

                //user login
                let user;

                user = await userModel.findOne({ email }); //busco por mail
                if (!user)
                    return done(null, false, { message: 'Credenciales incorrectas' });
        
                //VERIFICAR PASSWORD ENCRIPTADO
                const isValidPassword = await validatePassword (password, user.password);
                if (!isValidPassword)
                    return done(null, false, { message: 'Contraseña inválida' });
        
                //passport = Solo devuelvo al usuario
        
                user = {
                    id: user._id,
                    name: `${user.first_name} ${user.last_name}`,
                    email: user.email,
                    role: user.role,
                };
                return done(null, user);
                }
        )
    );
    
    passport.use(
        'github',
        new GithubStrategy({
            clientID: 'Iv1.4250e6fa066b5041',
            clientSecret: 'cc9174fece3d79b8a46857a5d1adea700b703895',
            callbackURL: `http://localhost:${process.env.PORT}/api/sessions/githubcallback`
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                console.log(profile);
                const { name, email } = profile._json;
                const user = await userModel.findOne({ email });
                //Gestionar ambas logicas de ussuario
                if(!user) {
                    const newUser =  {
                        first_name: name,
                        email,
                        password:''
                    }
                    const result = await userModel.create(newUser);
                    done(null,result);
                } 
                    done(null,user);
                } catch (error) {
                    done(error);
            }
        }
    ));

    passport.serializeUser(function (user, done) {
        return done(null, user.id);
    });
        passport.deserializeUser(async function (id, done) {
            if(id===0){
                return done(null,{
                    role:"admin",
                    name:"ADMIN"
                })
            }
        const user = await userModel.findOne({ _id: id });
        return done(null, user);
    });
    
    };
    export default initializePassportStrategies;