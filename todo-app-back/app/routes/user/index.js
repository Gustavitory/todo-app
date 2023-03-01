const express=require("express");
const { getUserInfo } = require("../../../db/controllers/user");


const userLogin=express.Router();


userLogin.use('/',getUserInfo);

module.exports=userLogin;