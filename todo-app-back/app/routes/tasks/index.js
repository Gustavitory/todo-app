const express=require("express");
const routertasks=express.Router();
const {getTasks, getMetricsLastWeek, createTask, editTask,deleteTask, createAleatoriesTasks}=require('../../../db/controllers/tasks')

//metodos de obtencion.
routertasks.get('/',getTasks);
routertasks.get('/metrics',getMetricsLastWeek);

// metodos de adicion o edicion.
routertasks.post('/create',createTask);
routertasks.post('/edit', editTask);
routertasks.post('/random',createAleatoriesTasks);

//metodos de expulsion.
routertasks.delete('/delete',deleteTask);

module.exports=routertasks