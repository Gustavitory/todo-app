import React from 'react'
import { StandardInput } from '../../../Atoms/Inputs/StandardInput/StandardInput';
import { useLoginForm } from '../../../Hooks/Forms/useLoginForm';
import { PasswordInput } from '../../../Atoms/Inputs/PasswordInput/PasswordInput';
import { ButtonTypeA } from '../../../Atoms/Buttons/ButtonTypeA/ButtonTypeA';
import { ContentCont } from '../../../Layout/Landing/Content/ContentCont';
import { ParrafoTipeA } from '../../../Atoms/Parrafos/ParrafoTypeA/ParrafoTypeA';
import { ModalRegisterForm } from '../RegisterForm/ModalRegisterForm';
import { useState } from 'react';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';


export const LoginForm = () => {
    const {errors,change,submit,checkForm} =useLoginForm()
    const [modal,setModal]=useState(false);
    const controller=(estado:boolean)=>{
        setModal(estado)
    }
    let navigate=useNavigate();
    const logear=(e:React.FormEvent)=>{
      submit(e)
      .then((result)=>{
        if(!result.status){
          throw new Error(result.error)
        }else{
          window.localStorage.setItem('todoToken',result.token);
          navigate("/app")
        }
      }).catch((err)=>{
        if(checkForm())Swal.fire({title:'Uups...',text:err.message,icon:'error',confirmButtonColor:'#3CBBD6'})
      })
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
