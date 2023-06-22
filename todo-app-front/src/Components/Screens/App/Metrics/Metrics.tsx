import { useEffect } from "react";
import { useGetMetrics } from "../../../Hooks/API/Tasks/useGetMetrics";
import { useSelector } from "react-redux";
import { VictoryAxis, VictoryBar, VictoryChart, VictoryTheme } from "victory";
import "./Metrics.css";
import { MetricsResume } from "../../../Molecules/MetricsResume/MetricsResume";
import { PrincipalCard } from "../../../Organisms/Cards/PrincipalCards/PrincipalCard";

export const Metrics = () => {
  const { getMetrics } = useGetMetrics();
  const metrics = useSelector((state: any) => state.tasks.metricsData);
  const successTasks = useSelector((state: any) =>
    state.tasks.tasksList.filter((task: any) => task.status === "Success")
  );

  useEffect(() => {
    getMetrics();
  });

  const diasAtras = (dias: number) => {
    let hoy = new Date().getDay();
    let result = hoy - dias;
    if (result < 0) return result + 7;
    else return result;
  };
  const weekDay = (dias: number) => {
    let idDay = diasAtras(dias);
    switch (idDay) {
      case 0:
        return "Dom";
      case 1:
        return "Lu";
      case 2:
        return "Ma";
      case 3:
        return "Mi";
      case 4:
        return "Ju";
      case 5:
        return "Vi";
      case 6:
        return "Sa";
    }
  };

  const data = metrics.length
    ? [
        { dia: weekDay(6), tasks: metrics[0] },
        { dia: weekDay(5), tasks: metrics[1] },
        { dia: weekDay(4), tasks: metrics[2] },
        { dia: weekDay(3), tasks: metrics[3] },
        { dia: weekDay(2), tasks: metrics[4] },
        { dia: weekDay(1), tasks: metrics[5] },
        { dia: weekDay(0), tasks: metrics[6] },
      ]
    : [];
  return (
    <div className="metricsCont">
      <div className="cabecera">
        <div className="graphicCont">
          <VictoryChart theme={VictoryTheme.material} domainPadding={20}>
            <VictoryAxis crossAxis={true} />

            <VictoryAxis dependentAxis tickFormat={(x) => x} />
            <VictoryBar
              style={{ data: { fill: "var(--primary-color)" } }}
              data={data}
              x="dia"
              y="tasks"
            />
          </VictoryChart>
        </div>
        <MetricsResume dias={metrics} />
      </div>
      <hr />
      <h3>Historial</h3>
      <div className="cardsCont">
        {successTasks.map((el: any, ind: number) => (
          <PrincipalCard
            info={el}
            handleDraggin={(draggin: boolean) => false}
          />
        ))}
      </div>
    </div>
  );
};
