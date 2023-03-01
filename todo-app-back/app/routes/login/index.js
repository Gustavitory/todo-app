const express=require("express");
const {register,login} = require("../../../db/controllers/login");
const routerLogin=express.Router();


routerLogin.get('/',login)
routerLogin.post('/register',register)

module.exports=routerLogin