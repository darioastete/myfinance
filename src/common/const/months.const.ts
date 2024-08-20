export const MonthsArray = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const MonthsArrayShort = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const START_YEAR = 2020;
const NUM_YEARS = 10;
export const YearsArray = Array.from({ length: NUM_YEARS }, (_, i) => {
  const year = START_YEAR + i;
  return { label: year.toString(), value: year };
});

export const Months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
].map((month, index) => ({
  label: month,
  value: index,
}));

export const WeeksForMonth = [
  { label: "1st week", value: 0 },
  { label: "2nd week", value: 1 },
  { label: "3rd week", value: 2 },
  { label: "4th week", value: 3 },
  { label: "5th week", value: 4 },
];
