import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { StandardInput } from "../../../Atoms/Inputs/StandardInput/StandardInput";
import { useCreateTaskForm } from "../../../Hooks/Forms/useCreateTaskForm";
import { TextArea } from "../../../Atoms/Inputs/TextArea/TextArea";
import { NumberInput } from "../../../Atoms/Inputs/numberInput/NumberInput";
import { SelectInput } from "../../../Atoms/Inputs/SelectInput/SelectInput";
interface modalRegisterFormProps {
  controller: (status: boolean) => void;
  state: boolean;
}

export function CreateTaskForm({ controller, state }: modalRegisterFormProps) {
  const { change, errors, submit, gradeOptions, createForm } =
    useCreateTaskForm();

  const registrar = (e: React.FormEvent) => {
    submit(e).then(() => controller(false));
  };
  return (
    <>
      <Button variant="primary" onClick={() => controller(true)}>
        +
      </Button>

      <Modal show={state} onHide={() => controller(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Registrarse</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={(e) => submit(e)}>
            <StandardInput
              title="Nombre"
              change={change}
              name="name"
              error={errors.name}
              placeHolder="Bañar a mi mascota"
            />
            <TextArea
              title="Descripcion"
              change={change}
              name="description"
              error={errors.description}
              placeHolder="Descripcion de la tarea creada"
            />
            <NumberInput
              title="Tiempo (minutos)"
              change={change}
              name="limitTime"
              error={errors.limitTime}
              placeHolder="0"
            />
            <SelectInput
              options={gradeOptions}
              change={change}
              value={createForm.grade}
              name="grade"
              title="Grado de la tarea"
            />
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => controller(false)}>
            Cerrar
          </Button>
          <Button variant="primary" onClick={(e) => registrar(e)}>
            Registrar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
