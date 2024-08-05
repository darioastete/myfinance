import type { APIRoute } from "astro";
import { generateId } from "../../common/utils/generateId.util";
import createdAtTimeZone from "../../common/utils/createdAt.util";
import { db, Goals } from "astro:db";

export const POST: APIRoute = async ({ request }): Promise<Response> => {
  try {
    const output = await request.json();
    const { user_id, amount, start_date, end_date, exceeded_amount } = output;

    const createdAt = createdAtTimeZone();
    const id = generateId();

    const goal = {
      id,
      user_id,
      amount,
      start_date,
      end_date,
      exceeded_amount,
      createdAt,
    };

    const result = await db.insert(Goals).values(goal);

    if (result.rowsAffected !== 1)
      return new Response("Failed to insert", { status: 400 });

    return new Response(JSON.stringify(goal), {
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
    const goals = await db.select().from(Goals);
    return new Response(JSON.stringify(goals), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.log(error);
    return new Response("Internal Server Error", { status: 500 });
  }
};
