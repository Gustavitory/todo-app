import Swal from "sweetalert2";
import moment from "moment";
import { useCreateTask } from "./useCreateTask";
import { v4 as uuidv4 } from "uuid";

export const useRandomTasks = () => {
  const verbos = [
    "Hacer",
    "Construir",
    "Brincar",
    "Aprender",
    "Estudiar",
    "Entrenar",
    "Ayudar",
    "Salir",
    "Limpiar",
    "Bañar",
    "Jugar",
    "Soñar",
    "Abrazar",
    "Asegurar",
  ];
  const sujetos = [
    "Casa",
    "Programa",
    "Obstaculos",
    "Productos",
    "Ropa",
    "Mascota",
    "Documento",
    "Amigo",
    "Arbol",
    "Cama",
    "Edificio",
    "Robot",
    "Auto",
    "Avion",
    "Escuela",
  ];
  function getRandomInt(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
  }
  function getRandomDecimal(min: number, max: number) {
    return Math.random() * (max - min) + min;
  }
  const { createTask } = useCreateTask();
  const createRandomTask = () => {
    for (let i = 0; i < 50; i++) {
      const weekInit = moment()
        .subtract({ days: 6 })
        .add({ days: getRandomInt(0, 7) });
      const dateRand = new Date(weekInit.toISOString().split("T")[0]);
      const limit = getRandomInt(10, 90);
      createTask({
        name: `${verbos[getRandomInt(0, verbos.length)]} ${
          sujetos[getRandomInt(0, sujetos.length)]
        }`,
        description: "Aleatory task",
        limitTime: limit,
        finishDate: new Date(dateRand).toISOString(),
        status: "Success",
        actualTime: limit * getRandomDecimal(0.8, 1),
        grade: getRandomInt(0, 3),
        creationDate: new Date(
          moment().subtract({ months: 1 }).toISOString().split("T")[0]
        ).toISOString(),
        id: uuidv4(),
      });
    }
  };

  const randomTasks = async () => {
    createRandomTask();
    Swal.fire({
      title: "Se han generado 50 tareas aleatorias!",
      confirmButtonColor: "var(--primary-color)",
      icon: "warning",
    });
  };
  return { randomTasks };
};
