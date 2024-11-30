import { serverSupabaseClient } from "#supabase/server";

export default defineEventHandler(async (event) => {
  const id = event.context.params.id;
  const body = await readBody(event);

  const client = await serverSupabaseClient(event);

  const { data, count, status, error, statusText } = await client
    .from("projects")
    .update(body)
    .eq("id", id)
    .select()
    .single();
  if (error) return error;

  return { data, message: "Project updated" };
});
