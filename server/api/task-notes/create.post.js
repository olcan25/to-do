import { serverSupabaseClient } from "#supabase/server";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  const client = await serverSupabaseClient(event);

  const { data, count, status, error, statusText } = await client
    .from("task_notes")
    .insert(body)
    .select()
    .single();
  if (error) return error;

  return { data, message: "Task note created" };
})