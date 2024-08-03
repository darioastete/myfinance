import { column, defineDb } from "astro:db";

const Users = {
  columns: {
    id: column.text({ primaryKey: true }),
    username: column.text(),
    password: column.text(),
    email: column.text(),
    createdAt: column.date(),
  },
};

const Incomes = {
  columns: {
    id: column.text({ primaryKey: true }),
    user_id: column.text(),
    amount: column.number(),
    description: column.text(),
    createdAt: column.date(),
  },
};

const Expenses = {
  columns: {
    id: column.text({ primaryKey: true }),
    user_id: column.text(),
    amount: column.number(),
    description: column.text(),
    createdAt: column.date(),
  },
};

const Goals = {
  columns: {
    id: column.text({ primaryKey: true }),
    user_id: column.text(),
    amount: column.number(),
    start_date: column.text(),
    end_date: column.text(),
    exceeded_amount: column.number(),
    createdAt: column.date(),
  },
};

// https://astro.build/db/config
export default defineDb({
  tables: {
    Users,
    Incomes,
    Expenses,
    Goals,
  },
});
