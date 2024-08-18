import type moment from "moment";
import { getUnixDateDateTime } from "@utils/getUnixDateDateTime.util";
import { DaysArray } from "@const/index";
import type { BaseTransaction, Income } from "@common/types";
// import { db, Incomes } from "astro:db";

export const getForWeek = async (week: number, month: number, year: number) => {
  const BASE_URL_DEV = "http://localhost:4321/api";
  const BASE_URL_PROD = "https://myfinance-five.vercel.app/api";
  const incomes = await fetch(`${BASE_URL_DEV}/incomes`).then((res) =>
    res.json()
  );

  const expenses = await fetch(`${BASE_URL_DEV}/expenses`).then((res) =>
    res.json()
  );

  // if (incomes.length <= 0) throw new Error("No incomes found");

  const incomesForWeek = transactionForWeek(incomes, week, month, year);
  const expensesForWeek = transactionForWeek(expenses, week, month, year);

  return {
    incomes: totalTransactionForWeek(incomesForWeek),
    expenses: totalTransactionForWeek(expensesForWeek),
  };
};

const getWeekOfMonth = (date: moment.Moment): number => {
  const startOfMonth = date.clone().startOf("month");
  const startOfWeek = startOfMonth.clone().startOf("week");
  return date.diff(startOfWeek, "weeks");
};

const transactionForWeek = (
  transactions: BaseTransaction[],
  week: number,
  month: number,
  year: number
): BaseTransaction[] => {
  return transactions.filter((income: Income) => {
    const date = getUnixDateDateTime(income.createdAt);
    const weekOfMonth = getWeekOfMonth(date);
    // console.log(month, date.month());
    return (
      weekOfMonth === week && date.month() + 1 === month && date.year() === year
    );
  });
};

const totalTransactionForWeek = (transactions: BaseTransaction[]): number[] => {
  return DaysArray.map((day, index) => {
    const transForDay = transactions.filter((trans: BaseTransaction) => {
      const date = getUnixDateDateTime(trans.createdAt);

      return date.day() === index;
    });

    return transForDay.reduce(
      (total: number, transaction: BaseTransaction) =>
        total + transaction.amount,
      0
    );
  });
};
