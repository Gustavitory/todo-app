import React,{useState} from 'react'
import { PrincipalCard } from '../../Organisms/Cards/PrincipalCards/PrincipalCard'
import './ContainerDD.css'
import { useEditTask } from '../../Hooks/API/Tasks/useEditTask';
import { useGetTasks } from '../../Hooks/API/Tasks/useGetTasks';

interface containerDDProps{
    status:string,
    data:any[],
    handleDraggin:(draggin:boolean)=>void,
    isDraggin:boolean
    isSuccess:boolean
}

export const ContainerDD = ({status,data,isDraggin,handleDraggin,isSuccess}:containerDDProps) => {
    const [filter,setFilter]=useState('Todas')
    const{editTask}=useEditTask()
    const{getTasks}=useGetTasks()
    function esp(palabra:string){
        switch(palabra){
            case 'Pending':
                return 'Pendiente'
            case 'In progress':
                return 'En progreso'
            case 'Success':
                return 'Completada'
            default:
                return 'Tarea'
        }
    }

    function filt(el:any,tipo:string){
        switch(tipo){
            case 'Cortas':
                return el<=30;
            case 'Medias':
                return el>30 && el<=60;
            case 'Largas':
                return el>60
            default:
                return true
        }
    }



    const change=(e:React.ChangeEvent<HTMLSelectElement>)=>{
        e.preventDefault();
        setFilter(e.target.value);
    }

    const handleDragOver=(e:React.DragEvent<HTMLDivElement>)=>{
        e.preventDefault()
    }
    const handleDrop=(e:React.DragEvent<HTMLDivElement>)=>{
        e.preventDefault();
        const id=e.dataTransfer.getData('text');
        console.log(e.dataTransfer.getData('text'),status);
        editTask({taskId:id,props:{status}})
        .then(()=>getTasks())
        handleDraggin(false);
    }
    if(isSuccess){

    }
  return (
    <div className={`layoutCards${isDraggin?' layoutDraggin':''}`}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
    >
        <p>{esp(status)}:</p>
        <span>Filtrar por:</span>
        <select  onChange={(e)=>change(e)}>
            <option value="Todos">Todos</option>
            <option value="Cortas">Cortas</option>
            <option value="Medias">Medias</option>
            <option value="Largas">Largas</option>
        </select>
        <hr />
        {
            data.filter((el)=>filt(el.limitTime,filter)).map((el,ind)=>(
                <PrincipalCard info={el} key={ind} handleDraggin={handleDraggin}/>
            ))
        }
    </div>
  )
}
