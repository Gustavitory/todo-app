import { headerLogin } from "../../../../API/index";
// import { useNavigate } from 'react-router-dom';
// import Swal from 'sweetalert2';

export const useLogin = () => {
  // const navigate=useNavigate()
  const login = async (header: headerLogin) => {
    return header;
  };
  return { login };
};
