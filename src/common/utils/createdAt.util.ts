import { format, tzDate } from "@formkit/tempo";

export default function (): number {
  console.log("AYDNEY: ", tzDate(new Date(), "Australia/Sydney").getTime());
  // const date = format({
  //   date: new Date(),
  //   format: "YYYY-MM-DD HH:mm:ss",
  //   tz: "Australia/Sydney",
  // });
  // return new Date(date).getTime();
  const date = tzDate(new Date(), "Australia/Sydney").getTime();
  return date;
}
