import { useSelector } from "react-redux";
import { tokenFinder, Url, postOptions } from "../../../../API/index";

export const useEditTask = () => {
  const tasks = useSelector((state: any) => state.tasks);
  const editTask = async (body: any) => {
    const token = tokenFinder();
    if (token) {
      try {
        const editTask = await fetch(
          `${Url}/tasks/edit`,
          postOptions(body, "POST", token)
        );
        const data = await editTask.json();
        if (!data || !data.status) throw new Error(data.message);
        else return data;
      } catch (err) {
        console.log("Error editando la lista: ", err);
      }
    }
  };
  return { editTask };
};
