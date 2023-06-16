import { useDispatch } from "react-redux";
import { editCreateTask } from "../../../../API/index";
import { createTaskAction } from "../../../../Redux/Reducers/Tasks";

export const useCreateTask = () => {
  const dispatch = useDispatch();
  const createTask = (body: any) => {
    dispatch(createTaskAction(body));
  };
  return { createTask };
};
