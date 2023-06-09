import { Router } from "express";
import {privacy} from '../middlewares/auth.js'

const router = Router();

router.get('/', async(req,res)=>{
    res.render('home')
})

router.get('/register',privacy('NO_AUTHENTICATED'),(req,res)=>{
    res.render('register');
})

router.get('/login',privacy('NO_AUTHENTICATED'),(req,res)=>{
    res.render('login')
})

router.get('/profile',privacy('PRIVATE'),(req,res)=>{
    res.render('profile',{
        user:req.session.user
    })
})

router.get('/logout', privacy('PRIVATE'), (req, res) => {
    const cookieName = req.session.cookie.name; 
    req.session.destroy(function(err) {
        if (err) {
            console.log('Error al cerrar sesión:', err);
        }
        res.destroy(cookieName); 
        res.redirect('/login');
    });
});


export default router