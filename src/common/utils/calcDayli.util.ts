import { db, Goals } from "astro:db";
import moment from "moment";

export const calcDayli = async (): Promise<number> => {
  try {
    const getCurrentMonth = moment().format("MM");

    const goals = await db.select().from(Goals);
    if (goals.length <= 0) return 0;

    const findGoal = goals.find(
      (goal) =>
        moment.unix(Number(goal.start_date)).format("MM") === getCurrentMonth
    );

    const totalDayli = findGoal?.amount ? findGoal.amount / 20 : 0;

    return totalDayli;
  } catch (error) {
    throw new Error("Error in calcDayli");
  }
};
