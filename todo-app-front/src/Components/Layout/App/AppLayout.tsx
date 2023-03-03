import React from 'react'
import { Outlet } from 'react-router-dom'
import { SideBar } from '../../Organisms/SideBar/SideBar';
import './AppLayout.css';

export const AppLayout = () => {
  return (
    <div className='AppLayoutCont'>
        <SideBar/>
        <div className='contentLayout'>
          <Outlet/>
        </div>
    </div>
  )
}
