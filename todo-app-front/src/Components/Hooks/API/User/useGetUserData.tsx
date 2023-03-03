import React from 'react'
import { useDispatch } from 'react-redux';
import { Url,tokenFinder,options } from '../../../../API';
import { setName } from '../../../../Redux/Reducers/User';

export const useGetUserData = () => {
    const dispatch=useDispatch();
    const getUserData=async()=>{
        const token=tokenFinder();
        if(token){
          try{
            const user=await fetch(`${Url}/user`,options({},'GET',token));
            const data=await user.json();
            if(!data||!data.status)throw new Error(data.message);
            else return dispatch(setName(data.userName))
          }catch(err){alert('Error creando la task')}
        }
    }
     
    return {getUserData};
}
