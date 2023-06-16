import React from "react";
import { useState } from "react";
import Swal from "sweetalert2";
import { useCreateTask } from "../API/Tasks/useCreateTask";
import { useGetTasks } from "../API/Tasks/useGetTasks";
import { v4 as uuidv4 } from "uuid";

export interface createFormReq {
  name: string;
  description: string;
  limitTime: number;
  grade: string;
  order: number;
  creationDate: Date;
  finishDate: null | Date;
  status: string;
  actualTime: number;
}
// id:string,
// name:string,
// description:string,
// creationDate:Date,//ojito con los usos horarios
// finishDate:Date|null,
// status:'Pending'|'In progress'|'Success'|'Canceled'|'Expired'|'Paused',
// limitTime:number,
// actualTime:number,
// grade:number,
// order:number

export const useCreateTaskForm = () => {
  const { getTasks } = useGetTasks();
  const { createTask } = useCreateTask();
  const initialState = {
    id: uuidv4(),
    name: "",
    description: "",
    limitTime: 0,
    grade: "0",
    order: 0,
    creationDate: new Date(),
    finishDate: null,
    status: "Pending",
    actualTime: 0,
  };
  const [createForm, setCreateForm] = useState<createFormReq>(initialState);
  const [errors, setErrors] = useState({
    name: "",
    description: "",
    limitTime: "",
    grade: "",
  });

  const change = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    setCreateForm({ ...createForm, [e.target.name]: e.target.value });
  };

  const checkForm = (): boolean => {
    const { name, description, limitTime, grade } = createForm;
    let validations = { name: "", description: "", limitTime: "", grade: "" };
    let isValid = true;
    if (!name) {
      validations.name = "Este campo es requerido.";
      isValid = false;
    }
    if (!description) {
      validations.description = "Este campo es requerido.";
      isValid = false;
    }
    if (limitTime === 0) {
      validations.limitTime = "Este campo es requerido";
      isValid = false;
    }
    if (grade === "0") {
      validations.grade = "Este campo es requerido";
      isValid = false;
    }
    setErrors({ ...validations });
    return isValid;
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    let isValid = checkForm();
    if (isValid) {
      createTask({ ...createForm, grade: parseInt(createForm.grade) });
      return await Swal.fire({
        title: "¡Tarea creada!",
        icon: "success",
        confirmButtonColor: "var(--primary-color)",
      }).then(() => {
        getTasks();
        // setCreateForm(initialState);
      });
    } else throw new Error();
  };

  const gradeOptions = [
    { value: null, title: "Vacío" },
    { value: 1, title: "Urgente" },
    { value: 2, title: "Importante" },
    { value: 3, title: "Necesario" },
  ];
  return { change, submit, gradeOptions, errors, createForm };
};
