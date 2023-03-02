import React from 'react';
import './StandardInput.css';

interface StandardInputProps{
    title:string,
    change:(e:React.ChangeEvent<HTMLInputElement>)=>void,
    name:string,
    error:string,
    placeHolder:string,
    readOnly?:boolean
}

export const StandardInput = ({title,change,name,error,placeHolder,readOnly=false}:StandardInputProps) => {
  return (
    <div className='PasswordInputCont'>
        <p className='title'>{title}</p>
        <input readOnly={readOnly} className={`${error?' errorInput':''}`} type="text" name={name} onChange={(e)=>change(e)} placeholder={placeHolder} />
        {error?<span className='errorText'>{error}</span>:null}
    </div>
  )
}
