import React, { useState } from "react";
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
  creationDate: string;
  finishDate: null | string;
  status: string;
  actualTime: number;
}

export const useCreateTaskForm = () => {
  const { getTasks } = useGetTasks();
  const { createTask } = useCreateTask();
  const date = new Date();
  const initialState = {
    name: "",
    description: "",
    limitTime: 0,
    grade: "0",
    order: 0,
    creationDate: date.toISOString(),
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
      createTask({
        ...createForm,
        grade: parseInt(createForm.grade),
        id: uuidv4(),
      });
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
