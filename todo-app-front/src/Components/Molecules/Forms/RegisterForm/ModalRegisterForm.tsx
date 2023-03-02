import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useRegisterForm } from '../../../Hooks/Forms/useRegisterForm';
import { PasswordInput } from '../../../Atoms/Inputs/PasswordInput/PasswordInput';
import { StandardInput } from '../../../Atoms/Inputs/StandardInput/StandardInput';
import Swal from 'sweetalert2';

interface modalRegisterFormProps{
    controller:(status:boolean)=>void;
    state:boolean;
}

export function ModalRegisterForm({controller,state}:modalRegisterFormProps) {
  const {errors,submit,change,reset}=useRegisterForm();

  const registrar=(e:React.FormEvent)=>{
    submit(e)
    .then((result)=>{
      if(!result.status){
        throw new Error(result.error)
      }
      else{
        Swal.fire({title:'Bienvenido!',text:'Ya te has registrado.',icon:'success',confirmButtonColor:'#3CBBD6'})
        .then(()=>{
          reset()
          controller(false)})
      }
    }).catch((err)=>{
      Swal.fire({title:'Uups...',text:err.message,icon:'error',confirmButtonColor:'#3CBBD6'})})
    }

  return (
    <>
      <Button variant="primary" onClick={()=>controller(true)}>
        Regístrate
      </Button>

      <Modal show={state} onHide={()=>controller(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Registrarse</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <form onSubmit={(e)=>submit(e)}>
                <StandardInput title='Nombre de usuario' change={change} name='userName' error={errors.userName} placeHolder='ToDoAppGuy'/>
                <PasswordInput error={errors.password} change={change}/>
                <PasswordInput name='confirmPassword' error={errors.confirmPassword} change={change} title='Confirmar contraseña' />
            </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={()=>controller(false)}>
            Cerrar
          </Button>
          <Button variant="primary" onClick={(e)=>registrar(e)}>
            Registrar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}