import React from 'react';
import './NumberInput.css';

interface StandardInputProps{
    title:string,
    change:(e:React.ChangeEvent<HTMLInputElement>)=>void,
    name:string,
    error:string,
    placeHolder:string,
    readOnly?:boolean
}

export const NumberInput = ({title,change,name,error,placeHolder,readOnly=false}:StandardInputProps) => {
  return (
    <div className='PasswordInputCont'>
        <p className='title'>{title}</p>
        <input readOnly={readOnly} className={`${error?' errorInput':''}`} type="number" name={name} onChange={(e)=>change(e)} placeholder={placeHolder} min={0}/>
        {error?<span className='errorText'>{error}</span>:null}
    </div>
  )
}
