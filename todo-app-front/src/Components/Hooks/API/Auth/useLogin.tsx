import { Url,loginOptions,headerLogin } from '../../../../API/index';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

export const useLogin = () => {
    const navigate=useNavigate()
    const login= async (header:headerLogin)=>{
        try{
          const user= await fetch(`${Url}/login`,loginOptions(header,'GET'));
          const data=await user.json();
          if(!data.status){
            throw new Error(data.error)
          }else{
            window.localStorage.setItem('todoToken',data.token);
            navigate("/app")
          }
        }catch(err:any){
            Swal.fire({title:'Uups...',text:err,icon:'error',confirmButtonColor:'#3CBBD6'})
        }
      }
  return {login}
}
