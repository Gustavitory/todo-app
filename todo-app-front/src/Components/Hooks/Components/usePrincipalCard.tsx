import React, { useEffect, useState } from "react";
import { useColorsTasks } from "../tasks/useColorsTasks";
import { useDeleteTask } from "../API/Tasks/useDeleteTask";
import { useEditTask } from "../API/Tasks/useEditTask";

export const usePrincipalCard = (info: any, handleDraggin: any) => {
  const [editModal, setEditModal] = useState<boolean>(false);
  const [infoModal, setInfoModal] = useState<boolean>(false);
  const { gradeProps, statusColor, timeCalc } = useColorsTasks();
  const { grade, name, id, limitTime, status, actualTime } = info;

  const [statusCopia, setStatusCopia] = useState(status);

  const [currentTime, setCurrentTime] = useState(actualTime);
  const [isPaused, setIsPaused] = useState(false);

  const infoController = (action: boolean) => setInfoModal(action);
  const controller = (action: boolean) => setEditModal(action);

  const { Icon, color, text } = gradeProps(grade);
  const { deleteTask } = useDeleteTask(id);
  const { seg, min } = timeCalc(
    statusCopia === "In progress" || statusCopia === "Paused"
      ? limitTime - currentTime
      : limitTime - actualTime
  );
  const { editTask } = useEditTask();
  useEffect(() => {
    const crono = setInterval(() => {
      if (statusCopia === "In progress") {
        setCurrentTime(currentTime + 0.0166667);
        editTask({ taskId: id, props: { actualTime: currentTime } });
      } else setCurrentTime(currentTime);
    }, 1000);
    return () => {
      clearInterval(crono);
    };
  });
  useEffect(() => {
    if (status === "In progress") {
      if (isPaused) {
        setStatusCopia("Paused");
      } else setStatusCopia("In progress");
    }
  }, [isPaused]);
  //   useEffect(() => {
  //     if (currentTime >= limitTime) {
  //       editTask({ taskId: id, props: { status: "Success" } });
  //     }
  //   }, [currentTime, limitTime]);

  const reset = () => {
    setCurrentTime(0);
    editTask({ taskId: id, props: { actualTime: 0 } });
  };

  const stop = () => {
    reset();
    setIsPaused(true);
  };
  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    console.log(info);
    e.dataTransfer.setData("text", `${info.id}`);
    handleDraggin(true);
  };
  const handleDragEnd = () => handleDraggin(false);

  return {
    statusColor,
    editModal,
    infoModal,
    name,
    setIsPaused,
    infoController,
    controller,
    Icon,
    color,
    text,
    seg,
    min,
    deleteTask,
    reset,
    handleDragStart,
    handleDragEnd,
    isPaused,
    id,
    currentTime,
    status,
    stop,
    actualTime,
  };
};
