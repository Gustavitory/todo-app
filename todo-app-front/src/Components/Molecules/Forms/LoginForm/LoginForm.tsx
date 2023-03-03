import React from 'react'
import { StandardInput } from '../../../Atoms/Inputs/StandardInput/StandardInput';
import { useLoginForm } from '../../../Hooks/Forms/useLoginForm';
import { PasswordInput } from '../../../Atoms/Inputs/PasswordInput/PasswordInput';
import { ButtonTypeA } from '../../../Atoms/Buttons/ButtonTypeA/ButtonTypeA';
import { ContentCont } from '../../../Layout/Landing/Content/ContentCont';
import { ParrafoTipeA } from '../../../Atoms/Parrafos/ParrafoTypeA/ParrafoTypeA';
import { ModalRegisterForm } from '../RegisterForm/ModalRegisterForm';
import { useState } from 'react';


export const LoginForm = () => {
    const {errors,change,submit} =useLoginForm()
    const [modal,setModal]=useState(false);
    const controller=(estado:boolean)=>{
        setModal(estado)
    }
    const logear=(e:React.FormEvent)=>{
      submit(e)
    }
  return (
    <ContentCont>
      <form onSubmit={(e)=>logear(e)}>
          <ParrafoTipeA title='¡Hola! Bienvenido a TodoApp' content='Inicia sesión con tu cuenta y disfruta de esta experiencia'/>
          <div style={{display:'flex',alignItems:'center',justifyContent:'space-between'}}>
            <p style={{margin:0}}>¿Aún no tienes cuenta?</p>
            <ModalRegisterForm state={modal} controller={controller}/>
          </div>
          <hr />
          <StandardInput title='Nombre de usuario' change={change} name='userName' error={errors.userName} placeHolder='ToDoAppGuy'/>
          <PasswordInput error={errors.password} change={change}/>
          <ButtonTypeA  text='Ingresar'  />
      </form>
    </ContentCont>
  )
}
