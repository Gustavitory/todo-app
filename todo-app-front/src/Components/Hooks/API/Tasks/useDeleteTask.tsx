import Swal from "sweetalert2";
import { deleteTask as deleteAction } from "../../../../Redux/Reducers/Tasks";
import { useDispatch } from "react-redux";

export const useDeleteTask = (taskId: string) => {
  const dispatch = useDispatch();
  const del = (TaskId: string) => {
    dispatch(deleteAction(TaskId));
  };

  const deleteTask = () => {
    return Swal.fire({
      title: "¿Seguro que quieres eliminar la tarea?",
      showCancelButton: true,
      confirmButtonText: "Eliminar",
      cancelButtonText: "Cancelar",
      confirmButtonColor: "var(--primary-color)",
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        del(taskId);
        Swal.fire({
          title: "La tarea ha sido eliminada",
          confirmButtonColor: "var(--primary-color)",
          icon: "success",
        });
      }
    });
  };
  return { deleteTask };
};
