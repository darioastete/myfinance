import { object, string, safeParse } from 'valibot';
import { g as generateId, d as db, E as Expenses } from '../../chunks/generateId.util_CGB-y6tf.mjs';
import { NOW } from '@astrojs/db/dist/runtime/virtual.js';
export { renderers } from '../../renderers.mjs';

const ExpenseSchema = object({
  user_id: string(),
  amount: string(),
  description: string()
});
const POST = async ({ request }) => {
  try {
    const { success, output } = safeParse(ExpenseSchema, await request.json());
    if (!success) return new Response("Invalid input", { status: 400 });
    const { user_id, amount, description } = output;
    const createdAt = NOW;
    const id = generateId();
    const expense = {
      id,
      user_id,
      amount: Number(amount),
      description,
      createdAt
    };
    const result = await db.insert(Expenses).values(expense);
    if (result.rowsAffected !== 1)
      return new Response("Failed to insert", { status: 400 });
    return new Response(JSON.stringify(result), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Internal Server Error", { status: 500 });
  }
};
const GET = async () => {
  try {
    const users = await db.select().from(Expenses);
    return new Response(JSON.stringify(users), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    console.log(error);
    return new Response("Internal Server Error", { status: 500 });
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  GET,
  POST
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
