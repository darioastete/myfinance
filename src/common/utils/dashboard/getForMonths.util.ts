import type { BaseTransaction } from "@common/types";
import { MonthsArray } from "@common/const";
import { getUnixDateDateTime } from "@utils/getUnixDateDateTime.util";

export const getForMonths = async (year: number) => {
  // const BASE_URL = import.meta.env.DEV
  //   ? "http://localhost:4321/api"
  //   : "https://myfinance-five.vercel.app/api";

  // biome-ignore lint/style/noUnusedTemplateLiteral: <explanation>
  const incomes = await fetch(`/api/incomes`).then((res) => res.json());

  // biome-ignore lint/style/noUnusedTemplateLiteral: <explanation>
  const expenses = await fetch(`/api/expenses`).then((res) => res.json());

  // if (incomes.length <= 0) throw new Error("No incomes found");

  const incomesForYear = transForYear(incomes, year);
  const expensesForYear = transForYear(expenses, year);

  const totalIncomesForYear = totalTransactionForYear(incomesForYear);
  const totalExpensesForYear = totalTransactionForYear(expensesForYear);

  return {
    incomes: totalIncomesForYear,
    expenses: totalExpensesForYear,
  };
};

const transForYear = (
  transactions: BaseTransaction[],
  year: number
): BaseTransaction[] => {
  return transactions.filter((trans: BaseTransaction) => {
    const date = getUnixDateDateTime(trans.createdAt);
    return date.year() === year;
  });
};

const totalTransactionForYear = (transactions: BaseTransaction[]): number[] => {
  return MonthsArray.map((month, index) => {
    const transForMonth = transactions.filter((income: BaseTransaction) => {
      const date = getUnixDateDateTime(income.createdAt);
      return date.month() === index;
    });

    return transForMonth.reduce(
      (total: number, income: BaseTransaction) => total + income.amount,
      0
    );
  });
};
