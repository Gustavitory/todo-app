const jwt = require('jsonwebtoken');
const {Task,User}=require('../db');
const moment=require('moment');
moment().format();
const {Op}=require('sequelize');


async function getTasks(req,res){//testeada todo ok
    const {token}=req.headers
    const {id}=jwt.decode(token,process.env.SECRET);
    if(!token) return res.status(401).json({status:false,message:'Token is required'})
    try{
        const tasks= await Task.findAll({
            where:{userId:id},
            include:[User],
            attributes:{
                exclude:['createdAt','updatedAt','userId']
            }
        })
        if (!tasks) return res.status(401).json({status:false,message:'No existen tareas'})
        else return res.send({status:true,tasks})

    }
    catch{(e)=>console.log(e,'Error en funcion getTasks')}
}

async function createTask(req,res){//testeada todo ok
    const {token}=req.headers
    if(!token) return res.status(401).json({status:false,message:'Token is required'})
    const {id}=jwt.decode(token,process.env.SECRET);
    const {name,description,time}=req.body;
    if(!name||!description||!time) return res.status(401).json({status:false,message:'name,description and time are required'})
    try{
        const user=await User.findByPk(id);
        if(!user) return res.status(401).json({status:false,message:'User no existe'})
        const task=await Task.create({name,description,time});
        const add=await user.addTask(task.id);
        if (!add) return res.status(401).json({status:false,message:'No se agrego la tarea'})
        else return res.send({status:true,add})

    }
    catch{(e)=>console.log(e,'Error en funcion createTask')}
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
  }

async function createAleatoriesTasks(req,res){
    const {token}=req.headers
    if(!token) return res.status(401).json({status:false,message:'Token is required'})
    const {id}=jwt.decode(token,process.env.SECRET);
    try{
        const promisesArray=[];
        const user=await User.findByPk(id);
        for(let i=0;i<50;i++){
            const today=moment();
            const weekDay={days:today.day(),hours:today.hours(),minutes:today.minutes()};
            const weekInit=moment().subtract(weekDay).add({days:1+getRandomInt(0,30)});
            const dateRand= new Date(weekInit.toISOString().split('T')[0]);
            promisesArray.push(
                    Task.create({name:`Task ${i+1}`,description:'Aleatory task',
                    time:getRandomInt(100,3001),finishDate:new Date(dateRand)})
                    .then((task)=>user.addTask(task.id))
            );
        }
        console.log(promisesArray)
        Promise.all(promisesArray)
        .then(()=>res.send({status:true,message:'Eventos aleatorios cargados.'}))
    }catch{}
}

async function editTask(req,res){
    const {token}=req.headers
    const {id}=jwt.decode(token,process.env.SECRET);
    if(!token) return res.status(401).json({status:false,message:'Token is required.'})
    const {taskId,props}=req.body;
    if(!taskId) return res.status(401).json({status:false,messaje:'Task id is required.'})
    try{
        const exist=await Task.findByPk(taskId);
        if(!exist) return res.status(401).json({status:false,message:'Inexistent task.'})
        if(exist.dataValues.userId!==id)return res.status(401).json({status:false,message:'No permission.'})
        const updates=await Task.update({
            ...props
        },{
            where:{
                id:taskId
            }
        })
        if (!updates) return res.status(401).json({status:false,message:'No existen tareas'})
        else return res.send({status:true,updates})

    }
    catch{(e)=>console.log(e,'Error en funcion getTasks')}
}
async function deleteTask(req,res){//testeada todo ok
    const {token}=req.headers
    const {id}=jwt.decode(token,process.env.SECRET);
    if(!token) return res.status(401).json({status:false,message:'Token is required'});
    const {taskId}=req.body;
    try{
        const task=await Task.findByPk(taskId);
        if(!task) return res.status(401).json({status:false,message:'la tarea no existe'})
        if(task.dataValues.userId!==id)return res.status(401).json({status:false,message:'No permission.'});
        await task.destroy();
        res.send({status:true,message:'Task deleted.'})

    }catch{}
}

async function getMetricsLastWeek(req,res){//testeada todo ok

    //En esta parte identificamos las fechas de inicio y fin de la semana
    const today=moment();
    const weekDay={days:today.day(),hours:today.hours(),minutes:today.minutes()};
    const weekInit=moment().subtract(weekDay).add({days:1});
    const dateInit= new Date(weekInit.toISOString().split('T')[0]);

    // res.send('La semana laboral inicio en :'+ dateInit + ' Y termina:'+ dateFinish)
    const {token}=req.headers
    const {id}=jwt.decode(token,process.env.SECRET);
    if(!token) return res.status(401).json({status:false,message:'Token is required'})
    try{
        const tasks= await Task.findAll({
            where:{
                userId:id,
                finishDate:{
                    [Op.between]:[dateInit,new Date()]
                }
            },
            // include:[User],
            attributes:{
                exclude:['createdAt','updatedAt','userId']
            }
        })
        if (!tasks.length) return res.status(200).json({status:true,tasks})
        else return res.send({status:true,tasks})

    }
    catch{(e)=>console.log(e,'Error en funcion getTasks')}
}


module.exports={getTasks,getMetricsLastWeek,createTask,editTask,deleteTask,createAleatoriesTasks}