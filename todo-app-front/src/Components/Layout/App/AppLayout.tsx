import React from 'react'
import { Outlet } from 'react-router-dom'

export const AppLayout = () => {
  return (
    <div>
        <div>SideBar</div>
        <div>
            <div>Navbar</div>
            <div>
                <Outlet/>
            </div>
        </div>
    </div>
  )
}
