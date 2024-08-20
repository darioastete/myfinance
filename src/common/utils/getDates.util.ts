import moment from "moment";
import momentTZ from "moment-timezone";

export const compareDayAndMonth = (unix: number): boolean => {
  const currentDateUNIX = momentTZ.tz(new Date(), "Australia/Sydney").unix();

  const date = momentTZ.tz(moment.unix(unix), "Australia/Sydney");
  const currentDate = momentTZ.tz(
    moment.unix(currentDateUNIX),
    "Australia/Sydney"
  );

  return currentDate.isSame(date, "day");
};
