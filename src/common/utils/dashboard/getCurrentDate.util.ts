import moment from "moment-timezone";
import { TIME_ZONE } from "@const/timeZone.const";

const getCurrentMoment = () => moment.tz(new Date(), TIME_ZONE.SYDNEY);

export const getCurrentDate = () => {
  return getCurrentMoment();
};

export const getCurrentMonth = (): number => {
  return getCurrentMoment().month();
};

export const getCurrentYear = (): number => {
  return getCurrentMoment().year();
};

export const getCurrentWeekOfmonth = (): number => {
  const currentMoment = getCurrentMoment();
  const startOfMonth = currentMoment.clone().startOf("month");
  const currentWeek = currentMoment.week();
  const startWeek = startOfMonth.week();
  // Calcular el número de semana del mes
  const weekOfMonth = currentWeek - startWeek;

  if (weekOfMonth < 0 || weekOfMonth > 5)
    throw new Error("Error al calcular la semana del mes");

  // Ajustar para que esté en el rango de 1 a 5
  // if (weekOfMonth < 1) {
  //   weekOfMonth = 1;
  // } else if (weekOfMonth > 5) {
  //   weekOfMonth = 5;
  // }

  return weekOfMonth;
};
