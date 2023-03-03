import React from 'react'
import { useDispatch } from 'react-redux'
import { tokenFinder,Url,options } from '../../../../API/index';
import { setTasks } from '../../../../Redux/Reducers/Tasks';

export const useGetMetrics = () => {
  const dispatch=useDispatch();
  const getMetrics=async()=>{
    const token=tokenFinder();
    if(token){
      try{
        const metrics=await fetch(`${Url}/tasks/metrics`,options({},'GET',token));
        const data=await metrics.json();
        if(!data||!data.status)throw new Error(data.message);
        else return dispatch(setTasks(data));
      }catch(err){alert('Error obteniendo las metricas')}
    }
  }
  return {getMetrics}
}
