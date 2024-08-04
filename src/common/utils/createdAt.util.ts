import { format } from "@formkit/tempo";

export default function (): number {
  const date = format({
    date: new Date(),
    format: "YYYY-MM-DD HH:mm",
    tz: "Australia/Sydney",
  });

  return new Date(date).getTime();
}
