import { useState } from 'react';
import {VscGraphLine} from 'react-icons/vsc';
import { AiOutlinePoweroff } from 'react-icons/ai';
import { SideBarItem } from '../../Atoms/SideBarItems/SideBarItem';
import {FaTasks} from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom';
import './SideBar.css';
import { ModalUserResume } from '../../Molecules/Resume/UserResume/ModalUserResume';
import Swal from 'sweetalert2';

export const SideBar = () => {
    const navigate=useNavigate();
    const [selected,setSelected]=useState('Tareas');
    const [Resume,setResume]=useState(false);
    function click(name:string){
        if(name==='Métricas')setResume(true);
        else setSelected(name)
      }
    let data=[
        {title:'Tareas',Icon:FaTasks,path:''},
        {title:'Métricas',Icon:VscGraphLine,path:'#'},
    ]
    
    let dataBottom=[
        {title:'Cerrar sesión',Icon:AiOutlinePoweroff,path:'#'}
    ]
    const closeSession=()=>{
      return Swal.fire({
        title: '¿Seguro que quieres irte?',
        showCancelButton: true,
        confirmButtonText: 'Salir',
        cancelButtonText:'Cancelar',
        confirmButtonColor:'var(--primary-color)'
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          window.localStorage.removeItem('todoToken');
          navigate('/');
        }
      })
    }



  return (
    <div className='allcont'>
        <div>
            <div className='header'>
                <div>ToDoApp</div>
            <div className='point'/>
            </div>
            <ul>
                {
                data.map(el=>{
                    return(
                    <li key={el.title}>
                        <Link to={el.path} style={{color:'var(--dark-color)',textDecoration:'none'}}>
                            <SideBarItem Icon={el.Icon} title={el.title} selected={selected} click={()=>click(el.title)} />
                        </Link>
                    </li>
                    )
                })
                }
            </ul>
        </div>
      <ul className='bottom'>
        {
          dataBottom.map(el=>{
            return(
              <li key={el.title}>
                <SideBarItem Icon={el.Icon} title={el.title} selected={''} click={()=>closeSession()} />
              </li>
            )
          })
        }
      </ul>
      <ModalUserResume state={Resume} controller={(status:boolean)=>setResume(status)} />
  </div>
  )
}
