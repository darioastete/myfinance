import moment from "moment-timezone";

export default function (): number {
  const dateInSydney = moment.tz(new Date(), "Australia/Sydney").unix();

  return dateInSydney;
}
