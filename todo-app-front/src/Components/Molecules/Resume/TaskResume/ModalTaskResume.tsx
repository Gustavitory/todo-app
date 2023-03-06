import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useColorsTasks } from '../../../Hooks/tasks/useColorsTasks';
import { statusColor, gradeColor } from '../../../Organisms/Cards/PrincipalCards/PrincipalCard';
import './ModalTaskResume.css'
interface modalRegisterFormProps{
    controller:(status:boolean)=>void;
    state:boolean;
    task:{
        id:string,
        name:string,
        description:string,
        creationDate:Date,//ojito con los usos horarios
        finishDate:Date|null,
        status:'Pending'|'In progress'|'Success'|'Canceled'|'Expired'|'Paused',
        limitTime:number,
        actualTime:number,
        grade:number,
        order:number
    }
}
export function ModalTaskResume({controller,state,task}:modalRegisterFormProps) {

    const {name,description,creationDate,finishDate,status,limitTime,actualTime,grade}=task;
    const {gradeProps,statusColor,timeCalc}=useColorsTasks()
    const {color,text,Icon}=gradeProps(grade);
    const limit=timeCalc(limitTime);
    const current=timeCalc(actualTime);
  return (
    <>
      <Modal show={state} onHide={()=>controller(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Informacion:</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <div className='resumeCont'>
                <span>nombre</span>
                <h3>{name}</h3>
                <hr />
                <span>Descripcion</span>
                <p>{description}</p>
                <hr />
                <div className='infoCont'>
                    <span>datos</span>
                    <p className='fecha'>Fecha de creacion: {creationDate.toString().split('T')[0]}</p>
                    <p className='fecha'>Fecha de culminacion: {finishDate?finishDate.toString().split('T')[0]:'-'}</p>
                    <div className='subInfoCont'>
                      <div>
                        <p>Tiempo:</p>
                        <div className='infoClock'>{current.min}<span>min</span> {current.seg} <span>seg</span> / {limit.min}<span>min</span> {limit.seg} <span>seg</span></div>
                      </div>
                        <div className='statusCont' style={{'--sta':`var(${statusColor(status)})`}as statusColor}>{status}</div>
                        <div className='gradeCont' style={{'--gra':`var(${color})`} as gradeColor}><Icon/>{text}</div>
                    </div>
                </div>
            </div>
            {/* <form onSubmit={(e)=>submit(e)}>
                <StandardInput title='Titulo' change={change} name='name' error={''} placeHolder='Nombre actual tarea'/>
                <TextArea title='Descripcion' change={change} name='description' error='' placeHolder='Descripcion actual' />
                <NumberInput title='Tiempo limite (minutos)' change={change} name='limitTime' error='' placeHolder='0'/>
                <SelectInput  title='Grado' name='grade' change={change} options={gradeOptions} value={editForm.grade?editForm.grade:0} />
            </form> */}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={()=>controller(false)}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}