import React from 'react'
import { useDispatch } from 'react-redux'
import { tokenFinder,Url,options } from '../../../../API/index';

export const useRandomTasks = () => {
    const randomTasks=async()=>{
        const token=tokenFinder();
        if(token){
          try{
            const randomTask=await fetch(`${Url}/tasks/random`,options({},'POST',token));
            const data=await randomTask.json();
            if(!data||!data.status)throw new Error(data.message);
            else return data
          }catch(err){alert('Error generando las random tasks')}
        }
      }
  return {}
}
