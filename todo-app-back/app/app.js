require("dotenv").config();
const express=require("express");
const router = require("./routes");
const cors=require('cors');
const { register, login } = require("../db/controllers/login");
const {PORT}=process.env

const config={
    application:{
        cors:{
            server:[
                {
                origin:"https://todo-app-one-tau-77.vercel.app",
                credentials:true
                }
            ]
        }
    }
}

const app = express()

app.use(express.static('public'));

app.use(cors(config.application.cors.server))

app.use(express.json())

// app.use((req,res,next)=>{
//     console.log("ejecutando middleware base")
//     next();
// })

app.get('/',(req,res)=>{
    res.send('Hello World')
})
app.use('/register',register);
app.use('/login',login)
app.use('/',router);


module.exports=app;