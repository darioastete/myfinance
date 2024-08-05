import { db, Goals } from "astro:db";
import moment from "moment";
import momentTZ from "moment-timezone";

export const calcDayli = async (): Promise<number> => {
  try {
    const getCurrentMonth = momentTZ
      .tz(new Date(), "Australia/Sydney")
      .format("MM");

    const goals = await db.select().from(Goals);

    if (goals.length <= 0) return 0;

    const findGoal = goals.find(
      (goal) =>
        momentTZ
          .tz(moment.unix(Number(goal.start_date)), "Australia/Sydney")
          .format("MM") === getCurrentMonth
    );

    const totalDayli = findGoal?.amount ? findGoal.amount / 20 : 0;

    return totalDayli;
  } catch (error) {
    throw new Error("Error in calcDayli");
  }
};
