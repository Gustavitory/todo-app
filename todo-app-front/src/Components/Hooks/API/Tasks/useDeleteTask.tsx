import { tokenFinder,Url,postOptions } from '../../../../API/index';
import Swal from 'sweetalert2';
import { useGetTasks } from './useGetTasks';

export const useDeleteTask = (taskId:string) => {
  const{getTasks}=useGetTasks()
    const del= async (TaskId:string)=>{
        try{
          const deleted= await fetch(`${Url}/tasks/delete`,postOptions({taskId:TaskId},'DELETE',tokenFinder()));
          const data=await deleted.json();
          if(!data||!data.status)throw new Error(data.message);
            else return data
        }catch(err){console.log(err)}
      }

    const deleteTask=()=>{
      return Swal.fire({
        title: '¿Seguro que quieres eliminar la tarea?',
        showCancelButton: true,
        confirmButtonText: 'Eliminar',
        cancelButtonText:'Cancelar',
        confirmButtonColor:'var(--primary-color)'
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          del(taskId)
          .then((responde)=>{
            console.log(responde)
            responde.status?
            Swal.fire({title:'La tarea ha sido eliminada',confirmButtonColor:'var(--primary-color)',icon:'success'}).then(()=>getTasks()):
            Swal.fire({title:'Error eliminando la tarea',confirmButtonColor:'var(--primary-color)',icon:'error'}); })
        }
      })
    }
  return {deleteTask}
}
