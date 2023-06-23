import { useDispatch } from "react-redux";
import { createTaskAction } from "../../../../Redux/Reducers/Tasks";

export const useCreateTask = () => {
  const dispatch = useDispatch();
  const createTask = (body: any) => {
    console.log(body);
    dispatch(createTaskAction(body));
  };
  return { createTask };
};
