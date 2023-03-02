import React from 'react';
import './ContentCont.css';

export const ContentCont = (props:React.PropsWithChildren) => {
  return (
    <div className='ContentCont' >
        {props.children}
    </div>
  )
}