import React from 'react'
import './Landing.css'

export const Landing = ({children}:React.PropsWithChildren) => {
  return (
    <div className='LayoutLandingCont'>
        <div className='childrenCont'>
            {children}
        </div>
    </div>
  )
}
