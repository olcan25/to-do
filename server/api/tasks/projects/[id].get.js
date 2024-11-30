import { serverSupabaseClient } from "#supabase/server";

export default defineEventHandler(async (event) => {
  const id = event.context.params.id;
  const client = await serverSupabaseClient(event);

  const { data, error } = await client.from("tasks").select("*").eq("project_id", id);
  if (error) return error;

  return { data };
})
