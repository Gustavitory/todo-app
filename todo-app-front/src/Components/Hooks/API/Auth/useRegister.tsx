import { headerLogin } from "../../../../API";
// import Swal from 'sweetalert2';

export const useRegister = () => {
  const register = async (header: headerLogin) => {
    return header;
  };
  return { register };
};
