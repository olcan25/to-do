import { serverSupabaseClient } from "#supabase/server";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { email, password } = body;

  const client = await serverSupabaseClient(event);

  const { data, error } = await client.auth.signInWithPassword({
    email,
    password,
  });
  if (error) return error;

  return { data, message: "User signed in" };
});
