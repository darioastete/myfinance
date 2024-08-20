import { db, Expenses, Goals, Incomes } from "astro:db";
import moment from "moment";
import { compareDayAndMonth } from "../utils/getDates.util";
import momentTZ from "moment-timezone";

export const calcMissedDay = async (): Promise<number> => {
  try {
    const getCurrentMonth = momentTZ
      .tz(new Date(), "Australia/Sydney")
      .format("MM");
    const goals = await db.select().from(Goals);

    // const expenses = await db.select().from(Expenses);
    const incomes = await db.select().from(Incomes);

    if (goals.length <= 0) return 0;

    const findGoal = goals.find(
      (goal) =>
        momentTZ
          .tz(moment.unix(Number(goal.start_date)), "Australia/Sydney")
          .format("MM") === getCurrentMonth
    );

    // const totalExpensesOfTheDay = expenses.reduce(
    //   (total, expense) =>
    //     compareDayAndMonth(expense.createdAt) ? total + expense.amount : total,
    //   0
    // );

    const totalIncomesOfTheDay = incomes.reduce(
      (total, income) =>
        compareDayAndMonth(income.createdAt) ? total + income.amount : total,
      0
    );

    const totalDayli = findGoal?.amount ? findGoal.amount / 20 : 0;

    const totalMissed = totalDayli - totalIncomesOfTheDay;
    //   totalDayli + totalIncomesOfTheDay - totalExpensesOfTheDay;

    return totalMissed;

    //   const expensesOfTheDay = expenses.filter((expense) =>
    //     compareDayAndMonth(expense.createdAt)
    //   );

    //   const incomesOfTheDay = incomes.filter((income) =>
    //     compareDayAndMonth(income.createdAt)
    //   );

    //   console.log("FINDGoal===> ", findGoal);
  } catch (error) {
    throw new Error("Error in calcMissed");
  }
};
