import React from 'react'
import { useDispatch } from 'react-redux'
import Swal from 'sweetalert2';
import { tokenFinder,Url,postOptions } from '../../../../API/index';
import { useGetTasks } from './useGetTasks';

export const useRandomTasks = () => {
  const {getTasks}=useGetTasks()
    const randomTasks=async()=>{
        const token=tokenFinder();
        if(token){
          try{
            const randomTask=await fetch(`${Url}/tasks/random`,postOptions({},'POST',token));
            const data=await randomTask.json();
            if(!data||!data.status)throw new Error(data.message);
            else Swal.fire({
              title:'Se han generado 50 tareas aleatorias',
              confirmButtonColor:'var(--primary-color)',
              icon:'warning'
            })
            .then(()=>getTasks())
          }catch(err){Swal.fire({
            title:'Error generando las tasks',
            icon:'error',
            confirmButtonColor:'var(--primary-color)'
          })}
        }
      }
  return {randomTasks}
}
