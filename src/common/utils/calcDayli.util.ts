import { db, Goals } from "astro:db";

const goal = await db.select().from(Goals);
console.log(goal);

export const calcDayli = () => {
  if (goal.length <= 0) return 0;

  const result = goal[0].amount / 20;
  return result;
};
