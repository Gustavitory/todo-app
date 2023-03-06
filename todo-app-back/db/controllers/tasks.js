const jwt = require('jsonwebtoken');
const {Task,User}=require('../db');
const moment=require('moment');
moment().format();
const {Op,fn,col}=require('sequelize');


async function getTasks(req,res){//testeada todo ok
    const {token}=req.headers
    const {id}=jwt.decode(token,process.env.SECRET);
    const options=()=>{
        return {
            where:{userId:id},
            // include:[User],
            attributes:{
                exclude:['createdAt','updatedAt','userId']
            },
            order:[
                ['order','ASC']
            ]
        }
    }
    if(!token) return res.status(401).json({status:false,message:'Token is required'})
    try{
        const all=await Task.findAll(options())
        const pendingTasks= all.filter(el=>el.status==='Pending')
        const inProgressTasks= all.filter(el=>el.status==='In progress')
        const successTasks= all.filter(el=>el.status==='Success')
        const canceledTasks= all.filter(el=>el.status==='Canceled')
        const expiredTasks= all.filter(el=>el.status==='Expired')
        const tasks={pendingTasks,inProgressTasks,successTasks,canceledTasks,expiredTasks}
        // if (!tasks) return res.status(401).json({status:false,message:'No existen tareas'})
        return res.send({status:true,tasks:tasks})

    }
    catch{(e)=>console.log(e,'Error en funcion getTasks')}
}

async function createTask(req,res){//testeada todo ok
    const {token}=req.headers
    if(!token) return res.status(401).json({status:false,message:'Token is required'})
    const {id}=jwt.decode(token,process.env.SECRET);
    const {name,description,limitTime}=req.body;
    if(!name||!description||!limitTime) return res.status(401).json({status:false,message:'name,description and time are required'})
    try{
        const user=await User.findByPk(id);
        if(!user) return res.status(401).json({status:false,message:'User no existe'})
        const task=await Task.create(req.body);
        const add=await user.addTask(task.id);
        if (!add) return res.status(401).json({status:false,message:'No se agrego la tarea'})
        else return res.send({status:true,message:'Tarea agregada'})

    }
    catch{(e)=>console.log(e,'Error en funcion createTask')}
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
  }

  const verbos=[
    'Hacer','Construir', 'Brincar', 'Aprender', 'Estudiar','Entrenar','Ayudar','Salir','Limpiar',"Bañar",'Jugar','Soñar','Abrazar','Asegurar'
  ]
  const sujetos=[
    'Casa','Programa','Obstaculos','Productos','Ropa','Mascota','Documento','Amigo','Arbol','Cama','Edificio','Robot','Auto','Avion','Escuela'
  ]

  const posibleStatus=['Pending','In progress','Success']

async function createAleatoriesTasks(req,res){
    const {token}=req.headers
    if(!token) return res.status(401).json({status:false,message:'Token is required'})
    const {id}=jwt.decode(token,process.env.SECRET);
    try{
        const promisesArray=[];
        const user=await User.findByPk(id);
        for(let i=0;i<50;i++){
            const weekInit=moment().subtract({days:6}).add({days:getRandomInt(0,6)});
            const dateRand= new Date(weekInit.toISOString().split('T')[0]);
            promisesArray.push(
                    Task.create({name:`${verbos[getRandomInt(0,verbos.length)]} ${sujetos[getRandomInt(0,sujetos.length)]}`,description:'Aleatory task',
                    limitTime:getRandomInt(10,90),finishDate:new Date(dateRand),status:posibleStatus[getRandomInt(0,posibleStatus.length)],
                    grade:getRandomInt(0,3),creationDate:new Date(moment().subtract({months:1}).toISOString().split('T')[0])
                })
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
    console.log('task ID'+taskId)
    try{
        const task=await Task.findByPk(taskId);
        if(!task) return res.status(401).json({status:false,message:'la tarea no existe'})
        if(task.dataValues.userId!==id)return res.status(401).json({status:false,message:'No permission.'});
        await task.destroy();
        res.send({status:true,message:'Task deleted.'})

    }catch(err){res.status(500).json({status:false,error:`Error: ${err}`})}
}

async function getMetricsLastWeek(req,res){//testeada todo ok
    const today=moment();
    const sevenDaysAgo={days:6,hours:today.hours(),minutes:today.minutes()};
    const weekInit=moment().subtract(sevenDaysAgo);
    const {token}=req.headers
    const {id}=jwt.decode(token,process.env.SECRET);
    if(!token) return res.status(401).json({status:false,message:'Token is required'})
    try{
        const distintosDias=[];
        for(let i=0;i<7;i++){
            let day=moment(weekInit.toISOString().split('T')[0]).add({days:i});
            let finishDate=moment(day.toISOString()).add({hour:23,minutes:59,seconds:59});
            console.log(day.toISOString())
            console.log(finishDate.toISOString())
            distintosDias.push(
                Task.count({where:{userId:id,status:'Success',finishDate:{[Op.between]:[new Date(day.toISOString()),new Date(finishDate.toISOString())]}}})
            )
        }
        const tasks=await Promise.all(distintosDias)
        if (!tasks.length) return res.status(200).json({status:true,tasks})
        else return res.send({status:true,tasks})
    }
    catch{(e)=>console.log(e,'Error en funcion getTasks')}
}


module.exports={getTasks,getMetricsLastWeek,createTask,editTask,deleteTask,createAleatoriesTasks}