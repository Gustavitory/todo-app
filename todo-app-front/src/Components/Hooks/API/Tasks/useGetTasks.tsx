import React from 'react'
import { useDispatch } from 'react-redux'
import { tokenFinder,Url,getOptions } from '../../../../API/index';
import { setTasks } from '../../../../Redux/Reducers/Tasks';

export const useGetTasks = () => {
  const dispatch=useDispatch();

  const getTasks=async()=>{
    const token=tokenFinder();
    if(token){
      try{
        const tasks=await fetch(`${Url}/tasks/`,getOptions(token));
        const data=await tasks.json();
        if(!data||!data.status)throw new Error(data.message);
        else dispatch(setTasks(data.tasks));
      }catch(err){console.log('Error con tasks:', err)}
    }
  }
  return {getTasks}
}
