import React from 'react'
import { useState } from 'react';

interface LoginFormReq{
    userName:string,
    password:string
}

export const useLoginForm = () => {
    const [loginForm,setLoginForm]=useState<LoginFormReq>({
        userName:'',
        password:''
    })
    const [errors,setErrors]=useState<LoginFormReq>({
        userName:'',
        password:''
    })

    const change=(e:React.ChangeEvent<HTMLInputElement>)=>{
        setLoginForm({...loginForm,
        [e.target.name]:e.target.value})
    }

    const checkForm= ():boolean=>{
        const {userName,password}=loginForm;
        let validations={userName:'',password:''};
        let isValid=true;
        if(!userName){
                validations.userName='Este campo es requerido.';
                isValid=false;
            }
        if(!password){
            validations.password='Este campo es requerido.';
            isValid=false;
        }
        else if(password.length<8){
            validations.password='La contraseña debe tener 8 caracteres como mínimo.';
            isValid=false;
        }
        setErrors({...validations});
        return isValid;
    }

    const submit=async (e:React.FormEvent)=>{
        e.preventDefault();
        let isValid=checkForm();
        console.log(checkForm())
        if(isValid){
            alert('Submit!')
        }
    }


  return {change,errors,submit}
  
}
