import type { APIRoute } from "astro";
import { object, string, safeParse } from "valibot";
import { db, eq, Incomes } from "astro:db";
import { generateId } from "../../common/utils/generateId.util";
import createdAtTimeZone from "../../common/utils/createdAt.util";
// import { getSession } from "auth-astro/server";

const IncomeSchema = object({
  user_id: string(),
  amount: string(),
  description: string(),
});

export const POST: APIRoute = async ({ request }): Promise<Response> => {
  //   const session = await getSession(req);

  //   if (!session || session?.user == null || session.user.role !== "admin") {
  //     return new Response("Unauthorized", { status: 401 });
  //   }

  try {
    const { success, output } = safeParse(IncomeSchema, await request.json());

    if (!success) return new Response("Invalid input", { status: 400 });

    const { user_id, amount, description } = output;

    const createdAt = createdAtTimeZone();
    const id = generateId();

    const income = {
      id,
      user_id,
      amount: Number(amount),
      description,
      createdAt,
    };

    const result = await db.insert(Incomes).values(income);

    if (result.rowsAffected !== 1)
      return new Response("Failed to insert", { status: 400 });

    return new Response(JSON.stringify(income), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.log(error);
    return new Response("Internal Server Error", { status: 500 });
  }
};

export const GET: APIRoute = async (): Promise<Response> => {
  try {
    const users = await db.select().from(Incomes);
    return new Response(JSON.stringify(users), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.log(error);
    return new Response("Internal Server Error", { status: 500 });
  }
};

export const DELETE: APIRoute = async ({ request }): Promise<Response> => {
  try {
    const { id } = await request.json();
    const result = await db.delete(Incomes).where(eq(Incomes.id, id));

    if (result.rowsAffected !== 1)
      return new Response("Failed to delete", { status: 400 });

    return new Response(JSON.stringify(result), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.log(error);
    return new Response("Internal Server Error", { status: 500 });
  }
};
