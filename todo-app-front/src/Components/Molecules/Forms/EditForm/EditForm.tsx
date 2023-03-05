import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { NumberInput } from '../../../Atoms/Inputs/numberInput/NumberInput';
import { SelectInput } from '../../../Atoms/Inputs/SelectInput/SelectInput';
import { StandardInput } from '../../../Atoms/Inputs/StandardInput/StandardInput';
import { TextArea } from '../../../Atoms/Inputs/TextArea/TextArea';
import { useEditForm } from '../../../Hooks/Forms/useEditForm';
interface modalRegisterFormProps{
    controller:(status:boolean)=>void;
    state:boolean;
    taskId:string
}

export function ModalEditForm({controller,state,taskId}:modalRegisterFormProps) {
  const {submit,change,gradeOptions,editForm}=useEditForm(taskId)

  const registrar=(e:React.FormEvent)=>{
    submit(e)
    .then(()=>controller(false))
  }
  return (
    <>
      {/* <Button variant="primary" onClick={()=>controller(true)}>
        Regístrate
      </Button> */}

      <Modal show={state} onHide={()=>controller(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Tarea:</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <form onSubmit={(e)=>submit(e)}>
                <StandardInput title='Titulo' change={change} name='name' error={''} placeHolder='Nombre actual tarea'/>
                <TextArea title='Descripcion' change={change} name='description' error='' placeHolder='Descripcion actual' />
                <NumberInput title='Tiempo limite (minutos)' change={change} name='limitTime' error='' placeHolder='0'/>
                <SelectInput  title='Grado' name='grade' change={change} options={gradeOptions} value={editForm.grade?editForm.grade:0} />
            </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={()=>controller(false)}>
            Cerrar
          </Button>
          <Button variant="primary" onClick={(e)=>registrar(e)}>
            Editar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}