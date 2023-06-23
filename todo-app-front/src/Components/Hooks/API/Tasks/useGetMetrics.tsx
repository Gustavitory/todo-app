import moment from "moment";
import { useSelector } from "react-redux";

export const useGetMetrics = () => {
  const tasksList = useSelector((state: any) => state.tasks.tasksList);

  // function getMetricsLastWeek() {
  //   //testeada todo ok
  //   console.log("seejecuta");
  //   const today = moment();
  //   const sevenDaysAgo = {
  //     days: 6,
  //     hours: today.hours(),
  //     minutes: today.minutes(),
  //   };
  //   const weekInit = moment().subtract(sevenDaysAgo);
  //   const distintosDias: number[] = [];
  //   for (let i = 0; i < 7; i++) {
  //     let day = moment(weekInit.toISOString().split("T")[0]).add({ days: i });
  //     let counter = tasksList.filter(
  //       (el: any) =>
  //         el.finishDate.split("T")[0] === day.toISOString().split("T")[0]
  //     ).length;
  //     distintosDias.push(counter);
  //   }
  //   console.log(distintosDias);
  //   return distintosDias;
  // }

  const getMetrics = () => {
    console.log("seejecuta");
    const today = moment();
    const sevenDaysAgo = {
      days: 6,
      hours: today.hours(),
      minutes: today.minutes(),
    };
    const weekInit = moment().subtract(sevenDaysAgo);
    const distintosDias: number[] = [];
    for (let i = 0; i < 7; i++) {
      let day = moment(weekInit.toISOString().split("T")[0]).add({ days: i });
      let counter = tasksList.filter(
        (el: any) =>
          el.finishDate.split("T")[0] === day.toISOString().split("T")[0]
      ).length;
      distintosDias.push(counter);
    }
    console.log(distintosDias);
    return distintosDias;
  };
  return { getMetrics };
};
