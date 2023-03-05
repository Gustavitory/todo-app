import React from 'react'
import { CreateTaskForm } from '../../Molecules/Forms/CreateTask/CreateTask';
import './TopBar.css';
import { useState } from 'react';
import { ButtonTypeB } from '../../Atoms/Buttons/ButtonTypeB/ButtonTypeB';
import {GiPerspectiveDiceSixFacesRandom} from 'react-icons/gi'
import { useRandomTasks } from '../../Hooks/API/Tasks/useRandomTasks';

export const TopBar = () => {
    const[create,setCreate]=useState<boolean>(false)
    const {randomTasks}=useRandomTasks();
    const controller=(action:boolean)=>{
        setCreate(action)
    }
  return (
    <div className='topBar'>
        <CreateTaskForm state={create} controller={controller}/>
        <ButtonTypeB color='--primary-color' action={()=>randomTasks()} text='Tareas random' Icon={GiPerspectiveDiceSixFacesRandom}/>
    </div>
  )
}
