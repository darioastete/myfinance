import moment from "moment";
import momentTZ from "moment-timezone";
import { TIME_ZONE } from "@const/timeZone.const";

export const getUnixDateDateTime = (unix: number | string) => {
  return momentTZ.tz(moment.unix(Number(unix)), TIME_ZONE.SYDNEY);
};
