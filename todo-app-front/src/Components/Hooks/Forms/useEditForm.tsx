import React from 'react'
import { useState } from 'react';
import { useGetTasks } from '../API/Tasks/useGetTasks';
import { useEditTask } from '../API/Tasks/useEditTask';

export interface editFormReq{
    name?:string;
    description?: string;
    status?: string;
    finishDate?:Date;
    limitTime?:number;
    actualTime?:number;
    order?:number;
    grade?:number;
}

export const useEditForm = (taskId:string) => {
    const {getTasks}=useGetTasks();
    const {editTask}=useEditTask();
    const initialState={
    }
    const [editForm,setEditForm]=useState<editFormReq>(initialState)

    const change=(e:React.ChangeEvent<HTMLInputElement>|React.ChangeEvent<HTMLTextAreaElement>|React.ChangeEvent<HTMLSelectElement>)=>{
        setEditForm({...editForm,
        [e.target.name]:e.target.value})
    }
    

    const purgueData=(obj:any):editFormReq=>{
        const keys=Object.keys(obj);
        const almacen={};
        for(let i=0;i<keys.length;i++){
            if(obj[keys[i]]!=='' && obj[keys[i]]!=='0'){
                Object.assign(almacen,{[keys[i]]:obj[keys[i]]})
            }
        }
        return almacen;
    }

    const submit=async (e:React.FormEvent)=>{
        e.preventDefault();
        let cleanData=purgueData(editForm);
        editTask({taskId,props:cleanData})
        .then(()=>getTasks())
        
    }

    const gradeOptions=[
        {value:null,title:''},
        {value:1,title:'Urgente'},
        {value:2,title:'Importante'},
        {value:3,title:'Necesario'}
    ]
  return {change,submit,gradeOptions,editForm}
  
}
