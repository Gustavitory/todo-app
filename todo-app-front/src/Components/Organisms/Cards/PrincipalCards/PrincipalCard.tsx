import { CSSProperties } from "react";
import "./PrincipalCard.css";
import { MdDeleteOutline } from "react-icons/md";
import { HiOutlineDocumentText } from "react-icons/hi";
import {
  AiOutlineEdit,
  AiOutlineReload,
  AiOutlinePauseCircle,
  AiOutlinePlayCircle,
} from "react-icons/ai";
import { BsStopCircle } from "react-icons/bs";
import { ModalEditForm } from "../../../Molecules/Forms/EditForm/EditForm";
import { ModalTaskResume } from "../../../Molecules/Resume/TaskResume/ModalTaskResume";
import { usePrincipalCard } from "../../../Hooks/Components/usePrincipalCard";

export interface statusColor extends CSSProperties {
  "--sta": string;
}
export interface gradeColor extends CSSProperties {
  "--gra": string;
}

export interface PrincipalCardProps {
  info: {
    id: string;
    name: string;
    description: string;
    creationDate: Date; //ojito con los usos horarios
    finishDate: Date | null;
    status:
      | "Pending"
      | "In progress"
      | "Success"
      | "Canceled"
      | "Expired"
      | "Paused";
    limitTime: number;
    actualTime: number;
    grade: number;
    order: number;
  };
  handleDraggin: (draggin: boolean) => void;
}

export const PrincipalCard = ({ info, handleDraggin }: PrincipalCardProps) => {
  const {
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
  } = usePrincipalCard(info, handleDraggin);
  return (
    <div
      className="principalCardCont"
      draggable
      onDragEnd={handleDragEnd}
      onDragStart={handleDragStart}
    >
      <div className="info">
        <p className="cardTitle">{name}</p>
        <hr />
        <div className="subInfo">
          <div
            className="grade"
            style={{ "--gra": `var(${color})` } as gradeColor}
          >
            <Icon /> {text}
          </div>
          <div
            className="status"
            style={{ "--sta": `var(${statusColor(status)})` } as statusColor}
          />
          {status === "In progress" ? (
            <>
              <AiOutlineReload className="icon" onClick={() => reset()} />
              {isPaused ? (
                <AiOutlinePlayCircle
                  className="icon"
                  onClick={() => setIsPaused(false)}
                />
              ) : (
                <AiOutlinePauseCircle
                  className="icon"
                  onClick={() => setIsPaused(true)}
                />
              )}
              <BsStopCircle className="icon" onClick={() => stop()} />
            </>
          ) : null}
        </div>
      </div>
      <div className="time">
        <div className="clock">
          <p className={`min${min < 0 ? " overtime" : ""}`}>
            <span>Min</span>
            {min}
          </p>
          <p className={`seg`}>
            <span>Seg</span>
            {seg}
          </p>
        </div>
        <div className="controls">
          {status === "Pending" ? (
            <>
              <AiOutlineEdit
                className="icon"
                onClick={() => controller(true)}
              />
              <MdDeleteOutline className="icon" onClick={() => deleteTask()} />
            </>
          ) : null}
          <HiOutlineDocumentText
            className="icon"
            onClick={() => infoController(true)}
          />
        </div>
      </div>
      <ModalEditForm state={editModal} controller={controller} taskId={id} />
      <ModalTaskResume
        state={infoModal}
        controller={infoController}
        task={{
          ...info,
          actualTime: status === "In progress" ? currentTime : actualTime,
        }}
      />
    </div>
  );
};
