import React from 'react'
import { useDispatch } from 'react-redux'
import { tokenFinder,Url,postOptions } from '../../../../API/index';
import { setTasks } from '../../../../Redux/Reducers/Tasks';

export const useGetMetrics = () => {
  const dispatch=useDispatch();
  const getMetrics=async()=>{
    const token=tokenFinder();
    if(token){
      try{
        const metrics=await fetch(`${Url}/tasks/metrics`,postOptions({},'GET',token));
        const data=await metrics.json();
        if(!data||!data.status)throw new Error(data.message);
        else return dispatch(setTasks(data));
      }catch(err){alert('Error obteniendo las metricas')}
    }
  }
  return {getMetrics}
}
