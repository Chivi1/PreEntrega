import express from 'express';
import handlebars from 'express-handlebars';
import MongoStore from 'connect-mongo';
import session from 'express-session';
import passport from 'passport'
import mongoose from 'mongoose';

import viewsRouter from './routers/viewsRouter.js'
import productsRouter from './routers/productsRouter.js'
import cartRouter from './routers/cartRouter.js'
import sessionsRouter from './routers/sessionRouter.js'
import config from  './config.js';

import __dirname from './utils.js';
import initializePassportStrategies from './config/passport.config.js';


const app = express();
const PORT  = config.app.PORT||8080;
const DB_URL = process.env.MONGO_URL;

mongoose.connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Conexión exitosa a la base de datos');
    // Resto de la configuración y rutas de la aplicación Express
    app.listen(PORT, () => console.log(`Servidor en ejecución en el puerto ${PORT}`));
  })
  .catch((error) => {
    console.error('Error al conectar a la base de datos:', error);
  });


app.use(session({
    store: new MongoStore({
        mongoUrl: DB_URL,
        ttl: 3600,
    }),
    secret:"CoderS3cretFelis",
    resave:false,
    saveUninitialized:false
}))

app.engine('handlebars', handlebars.engine());
app.set('views', `${__dirname}/views`);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(`${__dirname}/public`));

app.use(passport.initialize());
initializePassportStrategies();

app.use('/',viewsRouter);
app.use('/api/products', productsRouter);
app.use('/api/carts', cartRouter);
app.use('/api/sessions',sessionsRouter);

