import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Metrics from "../../../Screens/App/Metrics/Metrics";
import "./ModalUserResume.css";
interface modalRegisterFormProps {
  controller: (status: boolean) => void;
  state: boolean;
}
export function ModalUserResume({ controller, state }: modalRegisterFormProps) {
  return (
    <>
      <Modal show={state} onHide={() => controller(false)} size="xl">
        <Modal.Header closeButton>
          <Modal.Title>Resumen:</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="resumeCont">
            <Metrics />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => controller(false)}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
