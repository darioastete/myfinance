import moment from "moment";
import momentTZ from "moment-timezone";

export const compareDayAndMonth = (unix: number): boolean => {
  const currentDateUNIX = momentTZ.tz(new Date(), "Australia/Sydney").unix();

  //   console.log("UNIXXXX====", currentDateUNIX);

  const date = moment.unix(unix);
  const currentDate = moment.unix(currentDateUNIX);

  console.log(
    "ESTO ES UNA PRUEBA ==>",
    moment.unix(1722434400).format("DD-MM-YYYY HH:mm:ss")
  );

  //   console.log("DATE ===>", date);
  //   console.log("CURRENT DATE ===>", currentDate);
  //   console.log(currentDate.isSame(date, "day"));

  return currentDate.isSame(date, "day");
  //   console.log(currentDate.format("DD-MM-YYYY"));
  //   console.log(date.format("DD-MM-YYYY"));
  //   const isSameDay = currentDate.date() === date.date();
  //   const isSameMonth = currentDate.month() === date.month();
  //   const isSameYear = currentDate.year() === date.year();

  //   console.log(isSameDay, isSameMonth, isSameYear);

  //   return isSameDay && isSameMonth && isSameYear;

  //   if (!currentDate.isSame(date, "day")) return false;
  //   return true;
};
