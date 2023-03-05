import React from 'react'
import { useSelector } from 'react-redux'
import { PrincipalCard } from '../../../Organisms/Cards/PrincipalCards/PrincipalCard'

export const Principal = () => {
    const tasks=useSelector((state:any)=>state.tasks.allTasks);
    const{pendingTasks,inProgressTasks,successTasks,canceledTasks,expiredTasks}=tasks;
  return (
    <div>
        {
            pendingTasks.map((el:any,ind:number)=>{
                return(
                    <li key={ind}>
                        <PrincipalCard info={el} />
                    </li>
                )
            })
        }
        {
            inProgressTasks.map((el:any,ind:number)=>{
                return(
                    <li key={ind}>
                        <PrincipalCard info={el} />
                    </li>
                )
            })
        }
        {/* <PrincipalCard/> */}
    </div>
  )
}
