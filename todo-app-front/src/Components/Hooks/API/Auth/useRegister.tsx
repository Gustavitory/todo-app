import { Url,headerLogin,loginOptions } from '../../../../API'
import Swal from 'sweetalert2';

export const useRegister = () => {
    const register= async (header:headerLogin)=>{
        try{
            const newUser= await fetch(`${Url}/register`,loginOptions(header,'GET'));
            const data=await newUser.json();
            if(!data.status){
                throw new Error(data.error)
            }
            else{
                await Swal.fire({title:'Bienvenido!',text:'Ya te has registrado.',icon:'success',confirmButtonColor:'#3CBBD6'})
            }
        }catch(err){console.log(err)}
    }
    return {register};
}
