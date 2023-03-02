import React from 'react'
import { useState } from 'react';

interface RegisterFormReq{
    userName:string;
    password: string;
    confirmPassword: string;
}

export const useRegisterForm = () => {
    const initialState={
        userName:'',password:'',confirmPassword:''
    }
    const [loginForm,setLoginForm]=useState<RegisterFormReq>(initialState)
    const [errors,setErrors]=useState<RegisterFormReq>(initialState)

    const change=(e:React.ChangeEvent<HTMLInputElement>)=>{
        setLoginForm({...loginForm,
        [e.target.name]:e.target.value})
    }
    

    const checkForm= ():boolean=>{
        const {userName,password,confirmPassword}=loginForm;
        let validations=initialState;
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
        if(!confirmPassword){
            validations.confirmPassword='Este campo es requerido.'
            isValid=false;
        }
        else if(password!==confirmPassword){
            validations.confirmPassword='Las contraseñas deben coincidir.'
        }
        setErrors({...validations});
        return isValid;
    }

    const submit=async (e:React.FormEvent)=>{
        e.preventDefault();
        let isValid=checkForm();
        if(isValid){
            console.log('Submit!')
        }
    }
  return {change,errors,submit}
  
}
