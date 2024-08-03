import { object, string, safeParse } from 'valibot';
import { g as generateId, d as db, U as Users } from '../../chunks/generateId.util_CGB-y6tf.mjs';
import { NOW } from '@astrojs/db/dist/runtime/virtual.js';
export { renderers } from '../../renderers.mjs';

const UserSchema = object({
  username: string(),
  password: string(),
  email: string()
});
const POST = async ({ request }) => {
  try {
    const { success, output } = safeParse(UserSchema, await request.json());
    if (!success) return new Response("Invalid input", { status: 400 });
    const { username, password, email } = output;
    const createdAt = NOW;
    const id = generateId();
    const user = {
      id,
      username,
      password,
      email,
      createdAt
    };
    await db.insert(Users).values(user).onConflictDoUpdate({
      target: Users.id,
      set: user
    });
    return new Response(JSON.stringify(user), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Internal Server Error", { status: 500 });
  }
};
const GET = async () => {
  try {
    const users = await db.select().from(Users);
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
