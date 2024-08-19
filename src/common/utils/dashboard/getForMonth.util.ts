import type { BaseTransaction } from "@common/types";
import { getUnixDateDateTime } from "@utils/getUnixDateDateTime.util";
import moment from "moment";

export const getForMonth = async (month: number, year: number) => {
  // biome-ignore lint/style/noUnusedTemplateLiteral: <explanation>
  const incomes = await fetch(`/api/incomes`).then((res) => res.json());

  // biome-ignore lint/style/noUnusedTemplateLiteral: <explanation>
  const expenses = await fetch(`/api/expenses`).then((res) => res.json());
  const weeks = getWeeksForMonth(month, year);
  console.log(weeks);

  // return weeks;

  // if (incomes.length <= 0) throw new Error("No incomes found");

  const incomesForMonth = transForMonth(incomes, year, month);
  const expensesForMonth = transForMonth(expenses, year, month);

  const totalIncomesForMonth = totalTransactionForWeek(incomesForMonth, weeks);
  const totalExpensesForMonth = totalTransactionForWeek(
    expensesForMonth,
    weeks
  );

  console.log(totalIncomesForMonth);

  return {
    incomes: totalIncomesForMonth,
    expenses: totalExpensesForMonth,
    labels: weeks.map((week) => week.label),
  };
};

const transForMonth = (
  transactions: BaseTransaction[],
  year: number,
  month: number
): BaseTransaction[] => {
  return transactions.filter((trans: BaseTransaction) => {
    const date = getUnixDateDateTime(trans.createdAt);
    return date.year() === year && date.month() === month;
  });
};

type Week = {
  week: number;
  weekYear: number;
  label: string;
};

const totalTransactionForWeek = (
  transactions: BaseTransaction[],
  weeks: Week[]
): number[] => {
  return weeks.map((week) => {
    console.log("esta cargando", transactions);
    const transForWeek = transactions.filter((trans: BaseTransaction) => {
      const date = getUnixDateDateTime(trans.createdAt);
      console.log("sssss", date.week(), week.weekYear);
      return date.week() === week.weekYear;
    });

    return transForWeek.reduce(
      (total: number, trans: BaseTransaction) => total + trans.amount,
      0
    );
  });
};

const getWeeksForMonth = (month: number, year: number) => {
  const date = moment().year(year).month(month).date(1);
  const weeks = [];
  let week = 0;
  while (date.month() === month) {
    const startOfWeek = date.clone();
    const endOfWeek = date.clone().add(6, "days");

    weeks.push({
      weekYear: date.week(),
      week,
      label: `${startOfWeek.format("DD/MM")} - ${endOfWeek.format("DD/MM")}`,
    });
    date.add(1, "week");
    week++;
  }
  return weeks;
};
