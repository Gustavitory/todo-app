import React from 'react'
import './ButtonTypeA.css'

interface ButtomTypeAProps{
    action?:((e:React.FormEvent)=>void)
    text:string;
}

export const ButtonTypeA = ({action,text}:ButtomTypeAProps) => {
        return (
          <button type='submit' className='buttonTypeA' onClick={(e:React.FormEvent)=>action?action(e):null}>{text}</button>
        )
}