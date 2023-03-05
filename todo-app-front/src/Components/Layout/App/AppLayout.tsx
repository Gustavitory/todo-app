import React, { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { useGetTasks } from '../../Hooks/API/Tasks/useGetTasks';
import { useGetUserData } from '../../Hooks/API/User/useGetUserData';
import { SideBar } from '../../Organisms/SideBar/SideBar';
import { TopBar } from '../../Organisms/TopBar/TopBar';
import './AppLayout.css';

export const AppLayout = () => {
  const {getUserData}=useGetUserData()
  const {getTasks}=useGetTasks();
  useEffect(()=>{
    getUserData()
    getTasks()
  })
  return (
    <div className='AppLayoutCont'>
        <SideBar/>
        <div className='contentLayout'>
          <TopBar/>
          <hr />
          <Outlet/>
        </div>
    </div>
  )
}
