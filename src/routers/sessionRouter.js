import { Router } from "express";
import userModel from "../dao/mongo/Models/userModel.js";


const router = Router();

router.post('/register',async(req,res)=>{
    const result = await userModel.create(req.body);
    res.send({status:"success",payload:result});
    console.log(result)
})

router.post('/login',async(req,res)=>{
    const {email, password} = req.body;

    if (email === "adminCoder@coder.com" && password === "adminCod3r123"){
        req.session.user = {
            name: `Admin`,
            role: "admin",
            email:`...`}
            return res.sendStatus(200);
    }


    const user = await userModel.findOne({email,password});
    if(!user) return res.status(400).send({status:"error",error:"Usuario o contraseña incorrectas"});
    
    req.session.user = {
        name: `${user.first_name} ${user.last_name}`,
        email:user.email
    }

    res.sendStatus(200);
})



export default router;