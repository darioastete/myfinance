import type { APIRoute } from "astro";
import { object, string, safeParse } from "valibot";
import { db, Users, NOW } from "astro:db";
import { generateId } from "../../common/utils/generateId.util";
import createdAtTimeZone from "../../common/utils/createdAt.util";
// import { getSession } from "auth-astro/server";

const UserSchema = object({
  username: string(),
  password: string(),
  email: string(),
});

export const POST: APIRoute = async ({ request }): Promise<Response> => {
  //   const session = await getSession(req);

  //   if (!session || session?.user == null || session.user.role !== "admin") {
  //     return new Response("Unauthorized", { status: 401 });
  //   }

  try {
    const { success, output } = safeParse(UserSchema, await request.json());

    if (!success) return new Response("Invalid input", { status: 400 });

    const { username, password, email } = output;
    const createdAt = createdAtTimeZone();
    const id = generateId();

    const user = {
      id,
      username,
      password,
      email,
      createdAt,
    };

    await db.insert(Users).values(user).onConflictDoUpdate({
      target: Users.id,
      set: user,
    });

    return new Response(JSON.stringify(user), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Internal Server Error", { status: 500 });
  }
};

export const GET: APIRoute = async (): Promise<Response> => {
  try {
    const users = await db.select().from(Users);
    return new Response(JSON.stringify(users), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.log(error);
    return new Response("Internal Server Error", { status: 500 });
  }
};
