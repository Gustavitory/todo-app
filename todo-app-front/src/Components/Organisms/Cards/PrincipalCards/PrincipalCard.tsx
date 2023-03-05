import React, { CSSProperties,useEffect } from 'react'
import './PrincipalCard.css'
import {MdDeleteOutline} from 'react-icons/md';
import {HiOutlineDocumentText} from 'react-icons/hi';
import {AiOutlineEdit}from 'react-icons/ai';
import { ModalEditForm } from '../../../Molecules/Forms/EditForm/EditForm';
import { useState } from 'react';
import { useDeleteTask } from '../../../Hooks/API/Tasks/useDeleteTask';
import { useColorsTasks } from '../../../Hooks/tasks/useColorsTasks';
import { ModalTaskResume } from '../../../Molecules/Resume/TaskResume/ModalTaskResume';
import { useEditTask } from '../../../Hooks/API/Tasks/useEditTask';

export interface statusColor extends CSSProperties{
    "--sta":string
}
export interface gradeColor extends CSSProperties{
    "--gra":string
}

export interface PrincipalCardProps{
    info:{
        id:string,
        name:string,
        description:string,
        creationDate:Date,//ojito con los usos horarios
        finishDate:Date|null,
        status:'Pending'|'In progress'|'Success'|'Canceled'|'Expired',
        limitTime:number,
        actualTime:number,
        grade:number,
        order:number
    }
}

export const PrincipalCard = ({info}:PrincipalCardProps) => {
    const [editModal,setEditModal]=useState<boolean>(false);
    const [infoModal,setInfoModal]=useState<boolean>(false);
    const {gradeProps,statusColor,timeCalc} = useColorsTasks()
    const {grade,name,id,limitTime,status,actualTime}=info
    const [currentTime,setCurrentTime]=useState(actualTime)
    const infoController=(action:boolean)=>setInfoModal(action);
    const controller=(action:boolean)=>setEditModal(action);

    const {Icon,color,text}=gradeProps(grade);
    const{deleteTask}=useDeleteTask(id);
    const {seg,min}=timeCalc(limitTime-currentTime);
    const{editTask}=useEditTask()
    useEffect(()=>{
        const crono=setInterval(()=>{
            if(status==='In progress'){
                setCurrentTime(currentTime+0.0166667)
                editTask({taskId:id,props:{actualTime:currentTime}})
        }
        },1000)
        return ()=>{
            clearInterval(crono)
        }
    })
  return (
    <div className='principalCardCont'>
        <div className='info'>
            <p className='cardTitle'>{name}</p>
            <hr />
            <div className='subInfo'>
                <div className='grade' style={{"--gra":`var(${color})`}as gradeColor}><Icon/> {text}</div>
                <div className='status' style={{"--sta":`var(${statusColor(status)})`}as statusColor}/>
            </div>
        </div>
        <div className='time'>
            <div className='clock'>
                <p className={`min${min<0?' overtime':''}`}><span>Min</span>{min}</p>
                <p className={`seg`}><span>Seg</span>{seg}</p>
            </div>
            <div className='controls'>
                {
                    status!=='In progress'?
                    <AiOutlineEdit className='icon' onClick={()=>controller(true)}/>:
                    null
                }
                <MdDeleteOutline className='icon' onClick={()=>deleteTask()}/>
                <HiOutlineDocumentText className='icon' onClick={()=>infoController(true)}/>
            </div>
        </div>
        <ModalEditForm state={editModal} controller={controller} taskId={id}/>
        <ModalTaskResume state={infoModal} controller={infoController} task={{...info,actualTime:currentTime}} />
    </div>
  )
}
