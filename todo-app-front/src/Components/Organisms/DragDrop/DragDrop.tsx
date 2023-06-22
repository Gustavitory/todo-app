import "./DragDrop.css";
import { ContainerDD } from "../../Atoms/ContainerDD/ContainerDD";
import { useSelector } from "react-redux";
import { useState } from "react";

type status = "Pending" | "In progress" | "Success";

export const DragDrop = () => {
  const [draggin, setDraggin] = useState(false);
  const handleDraggin = (draggin: boolean) => setDraggin(draggin);

  const typesTaks: status[] = ["Pending", "In progress", "Success"];
  const tasks = useSelector((state: any) => state.tasks);
  const { tasksList } = tasks;
  function asignData(status: string) {
    switch (status) {
      case "Pending":
        return tasksList.filter((task: any) => task.status === "Pending");
      case "In progress":
        return tasksList.filter((task: any) => task.status === "In progress");
      case "Success":
        return tasksList
          .filter((task: any) => task.status === "Success")
          .filter(
            (task: any) =>
              task.finishDate.split("T")[0] ===
              new Date().toISOString().split("T")[0]
          );
      default:
        return [];
    }
  }
  return (
    <div className="grid">
      {typesTaks.map((cont) => {
        return (
          <ContainerDD
            status={cont}
            key={cont}
            data={asignData(cont)}
            isDraggin={draggin}
            handleDraggin={handleDraggin}
            isSuccess={cont === "Success"}
          />
        );
      })}
    </div>
  );
};
