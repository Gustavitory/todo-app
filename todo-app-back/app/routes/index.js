const express=require("express")
const routerLogin = require("./login")
const routertasks = require("./tasks")
const router=express.Router()
const jwt=require('jsonwebtoken');
const moment=require('moment');
const userLogin = require("./user");

router.use(async (req,res,next)=>{
    console.log("verificando Token")
    const {token}=req.headers
    if(!token){
        res.status(403).json({status:false,message:'Sin autorización.'})
    }
    try{
        let payload=jwt.decode(token,process.env.SECRET);
        if(payload.exp<=moment().unix()){
            return res.status(401).json({status:false,message:'Autorización expirada'})
        }
        console.log('success')
    }catch(ex){return res.status(404).json({status:false,message:'Autorizacion invalidad'})}
    next()//el next es importante porque ejecuta el middleware y luego procesa la llamada
    //puedo hacer validaciones con el middleware y si no se cumple sencillamente omito el next
})

router.use("/tasks",routertasks);
router.use("/login",routerLogin);
router.use('/user',userLogin);

module.exports=router