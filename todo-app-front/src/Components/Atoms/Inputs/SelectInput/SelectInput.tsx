import React from 'react'
import Form from 'react-bootstrap/Form';
import './SelectInput.css'


interface selectInputProps{
    name:string,
    title:string,
    change:(e:React.ChangeEvent<HTMLSelectElement>)=>void,
    value:string|number,
    options:any[]
}

export const SelectInput = ({name,title,change,options,value}:selectInputProps) => {
  return (
    <div className='selectCont'>
        <p className='title'>{title}</p>
        <Form.Select name={name} onChange={(e)=>change(e)} value={value} bsPrefix={'formSelect'}>
            {
                options.map((el,ind)=>{
                    return(
                        <option value={el.value} key={ind} >{el.title}</option>
                    )
                })
            }
        </Form.Select>
    </div>
  )
}
