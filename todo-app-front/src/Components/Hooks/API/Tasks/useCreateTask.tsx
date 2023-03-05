import React from 'react'
import { editCreateTask,tokenFinder,Url,postOptions } from '../../../../API/index';

export const useCreateTask = () => {
    const createTask=async(body:editCreateTask)=>{
        const token=tokenFinder();
        if(token){
          try{
            const newTask=await fetch(`${Url}/tasks/create`,postOptions(body,'POST',token));
            const data=await newTask.json();
            if(!data||!data.status)throw new Error(data.message);
            else return data
          }catch(err){alert('Error creando la task')}
        }
      }
  return {createTask}
}
