import { useDispatch } from "react-redux";
import { editTask as edit } from "../../../../Redux/Reducers/Tasks";

export const useEditTask = () => {
  const dispatch = useDispatch();
  const editTask = (body: any) => {
    dispatch(edit(body));
  };
  return { editTask };
};
