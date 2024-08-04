import { tzDate } from "@formkit/tempo";
import moment from "moment-timezone";

export default function (): number {
  // const date = tzDate(new Date(), "Australia/Sydney").getTime();
  const dateInSydney = moment.tz(new Date(), "Australia/Sydney").valueOf();

  return dateInSydney;
}
