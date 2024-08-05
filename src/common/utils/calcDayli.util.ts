import { db, Goals } from "astro:db";
import moment from "moment";
import momentTZ from "moment-timezone";

export const calcDayli = async (): Promise<number> => {
  try {
    const getCurrentMonth = momentTZ
      .tz(new Date(), "Australia/Sydney")
      .format("MM");

    console.log(
      "CURRENT DATE:",
      momentTZ.tz(new Date(), "Australia/Sydney").format("DD-MM-YYYY HH:mm:ss")
    );

    const goals = await db.select().from(Goals);

    console.log("HAY GOALS======>", goals);

    if (goals.length <= 0) return 0;

    const findGoal = goals.find((goal) => {
      console.log(
        "FIND GOAL DATEEEE V3 ===>",
        momentTZ
          .tz(moment.unix(Number(goal.start_date)), "Australia/Sydney")
          .format("MM")
      );

      return (
        momentTZ
          .tz(moment.unix(Number(goal.start_date)), "Australia/Sydney")
          .format("MM") === getCurrentMonth
      );
    });

    const totalDayli = findGoal?.amount ? findGoal.amount / 20 : 0;

    return totalDayli;
  } catch (error) {
    throw new Error("Error in calcDayli");
  }
};
