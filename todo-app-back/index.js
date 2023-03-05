const bcrypt=require('bcrypt');
const app = require('./app/app');
const { conn,User,Task } = require('./db/db');
const moment=require('moment');

const PORT = process.env.PORT || 3001;

conn.sync({ alter: true,force:true })
    .then(() => {
        app.listen(PORT, () => {           
            console.log(`Server listening at ${PORT}`);
        });
    })
    .then(()=>{
        const fechaAyer=moment().subtract(2,'days').toISOString();
        const fechaSemana=moment().subtract(1,'week').toISOString();
        let creandoTasks=[
            Task.create({name:'tarea',description:'ololo'}),
            Task.create({name:'tarea1',description:'ololo1',finishDate:new Date(fechaAyer),status:'In progress'}),
            Task.create({name:'tarea3',description:'ololo1',finishDate:new Date(fechaSemana),status:'Success'}),
            Task.create({name:'tarea2',description:'ololo1',finishDate:new Date(fechaSemana)}),
            Task.create({name:'tarea4',description:'ololo1',finishDate:new Date(fechaSemana)}),
            Task.create({name:'tarea5',description:'ololo1',finishDate:new Date(fechaSemana)}),
            Task.create({name:'tarea6',description:'ololo1',finishDate:new Date(fechaAyer)}),
        ]
        Promise.all(creandoTasks)
        .then(tasks=>User.create({password:'12345',userName:'gustavo@correo.com'}).then(user=>tasks.map((task)=>{
            user.addTask(task.id)
        })))
    })
    .catch(e => console.log('ERROR :( ' + e));