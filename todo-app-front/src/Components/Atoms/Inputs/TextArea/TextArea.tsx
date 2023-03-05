import React from 'react';
import './TextArea.css';

interface StandardInputProps{
    title:string,
    change:(e:React.ChangeEvent<HTMLTextAreaElement>)=>void,
    name:string,
    error:string,
    placeHolder:string,
    readOnly?:boolean
}

export const TextArea = ({title,change,name,error,placeHolder,readOnly=false}:StandardInputProps) => {
  return (
    <div className='TextAreaCont'>
        <p className='title'>{title}</p>
        <textarea readOnly={readOnly} className={`${error?' errorInput':''}`} name={name} onChange={(e)=>change(e)} placeholder={placeHolder} />
        {error?<span className='errorText'>{error}</span>:null}
    </div>
  )
}
