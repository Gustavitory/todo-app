import React from 'react'
import { tokenFinder,Url,options } from '../../../../API/index';

export const useDeleteTask = () => {
    const deleteTask= async (TaskId:string)=>{
        try{
          const deleted= await fetch(`${Url}/login`,options({taskId:TaskId},'DELETE',tokenFinder()));
          const data=await deleted.json();
          if(!data||!data.status)throw new Error(data.message);
            else return data
        }catch(err){console.log(err)}
      }
  return {deleteTask}
}
