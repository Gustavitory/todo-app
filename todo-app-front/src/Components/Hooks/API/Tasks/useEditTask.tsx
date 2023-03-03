import React from 'react';
import { editCreateTask,tokenFinder,Url,options } from '../../../../API/index';

export const useEditTask = () => {
    const editTask=async(body:editCreateTask)=>{
        const token=tokenFinder();
        if(token){
          try{
            const editTask=await fetch(`${Url}/tasks/edit`,options(body,'POST',token));
            const data=await editTask.json();
            if(!data||!data.status)throw new Error(data.message);
            else return data
          }catch(err){alert('Error editando la lista')}
        }
      }
  return {editTask}
}
