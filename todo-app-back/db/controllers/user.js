const jwt=require('jsonwebtoken');
const {User}=require('../db');




async function getUserInfo(req,res){
    const {token}=req.headers
    if(!token) return res.status(401).json({status:false,message:'Token is required'})
    const {id}=jwt.decode(token,process.env.SECRET);
    try{
        const user=await User.findByPk(id);
        if(!user)return res.status(401).json({status:false,message:'Usuario inexistente o actualizado.'})
        return res.send({
            status:true,
            user:user.dataValues
        })
    }catch{}
}

module.exports={getUserInfo};