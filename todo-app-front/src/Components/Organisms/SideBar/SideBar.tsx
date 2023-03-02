import React from 'react'
import { useState } from 'react';
import {VscGraphLine} from 'react-icons/vsc';
import { AiOutlinePoweroff } from 'react-icons/ai';
import { SideBarItem } from '../../Atoms/SideBarItems/SideBarItem';
import {FaTasks} from 'react-icons/fa'
import { Link } from 'react-router-dom';
import './SideBar.css';

export const SideBar = () => {
    const [selected,setSelected]=useState('Tareas');
    function click(name:string){
        setSelected(name)
      }
    let data=[
        {title:'Tareas',Icon:FaTasks,path:''},
        {title:'Métricas',Icon:VscGraphLine,path:'metrics'},
    ]
    
    let dataBottom=[
        {title:'Cerrar sesión',Icon:AiOutlinePoweroff,path:'#'}
    ]
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
                <SideBarItem Icon={el.Icon} title={el.title} selected={''} click={()=>alert('Confirmacion para cerrar sesion')} />
              </li>
            )
          })
        }
      </ul>
  </div>
  )
}
