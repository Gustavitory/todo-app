import React,{ useState } from 'react';
import {AiOutlineEye} from 'react-icons/ai';
import {AiOutlineEyeInvisible} from 'react-icons/ai';
import './PasswordInput.css';

interface PasswordInputProps{
    error:string,
    change:(e:React.ChangeEvent<HTMLInputElement>)=>void,
    // forgot?:boolean,
    name?:string,
    placeholder?:string,
    title?:string;
}

export const PasswordInput = ({error,change,name='password',placeholder='⚉ ⚉ ⚉ ⚉ ⚉ ',title='Contraseña'}:PasswordInputProps) => {
    const [visible,setVisible]=useState(false);
  return (
    <div>
        <div className='InputPasswordTexts'>
            <span>{title}</span>
            {/* {forgot?<Link href='/forgotPassword' style={{color:'#7367F0'}}>¿Olvidaste la contraseña?</Link>:null} */}
            
        </div>
        <div className='PasswordInputCont'>
            <input className={`passwordInput${error?' errorInput':''}`} type={visible?'text':'password'} placeholder={placeholder}
            name={name} onChange={(e)=>change(e)}/>
            {visible?
                <AiOutlineEyeInvisible className='eye' onClick={()=>setVisible(false)}/>:
                <AiOutlineEye className='eye' onClick={()=>setVisible(true)}/>
            }
            {error?<span className='errorText'>{error}</span>:null}
        </div>
    </div>
  )
}
