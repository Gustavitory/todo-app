const jwt=require('jsonwebtoken');
const {User}=require('../db');
const moment=require('moment');

async function login (req,res){
    // const {userName,password}=req.headers;
    const userName=req.get('userName');
    const password=req.get('password');
    if(!userName||!password) return res.status(401).json({status:false,message:'El email y password son requeridos.'})
    try{
        const user= await User.findOne({where:{userName:userName}})
        const userExist=user? await user.validPassword(password):false;
        if(!userExist){
            return res.status(401).json({
                status:false,
                error:'Invalid user or password'
            })
        }
        else{
           const userForToken={
                id:user.id,
                iat:moment().unix(),
                exp:moment().add(10,'days').unix()
            }
            const token=jwt.sign(userForToken,process.env.SECRET)
                return res.send({
                    status:true,
                    token
                }) 
        }
        
    }catch{e=>res.status(401).json({status:false,error:'error con el manejo de los datos'})}
}
async function register(req,res){
    const {userName,password}=req.headers;
    if(!userName||!password) return res.status(401).json({status:false,message:'El email y password son requeridos.'});
    try{
        const user= await User.findOne({where:{userName:userName}})
        const userExist=user? true:false;
        if(userExist){
            return res.status(401).json({
                status:false,
                error:'El usuario ya existe'
            })
        }else{
            User.create({userName,password})
            .then(()=>res.send({status:true}))
            .catch9(()=>res.status(404).json({status:false,message:'Algo salio mal con la creacion del usuario'}))
        }
    }catch{}
}

module.exports={login,register}