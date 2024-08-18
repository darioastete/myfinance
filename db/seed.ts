import { db, Incomes, Expenses } from "astro:db";

// https://astro.build/db/seed
export default async function seed() {
  // TODO
  await db.insert(Incomes).values([
    {
      id: "1",
      user_id: "1",
      amount: 100,
      description: "First income",
      createdAt: 1723700621,
    },
  ]);
  await db.insert(Expenses).values([
    {
      id: "1",
      user_id: "1",
      amount: 50,
      description: "First expense",
      createdAt: 1723700621,
    },
  ]);
}
