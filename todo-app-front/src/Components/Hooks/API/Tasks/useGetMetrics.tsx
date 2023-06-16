import { useDispatch } from "react-redux";
import { tokenFinder, Url, getOptions } from "../../../../API/index";
import { setMetrics } from "../../../../Redux/Reducers/Tasks";

export const useGetMetrics = () => {
  const dispatch = useDispatch();
  const getMetrics = async () => {
    const token = tokenFinder();
    if (token) {
      try {
        console.log("Entrando a la peticion");
        const metrics = await fetch(`${Url}/tasks/metrics`, getOptions(token));
        const data = await metrics.json();
        if (!data || !data.status) throw new Error(data.message);
        // else return dispatch(setMetrics(data.tasks));
      } catch (err) {
        console.log(err);
      }
    }
  };
  return { getMetrics };
};
