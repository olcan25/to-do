import { serverSupabaseClient } from "#supabase/server";

export default defineEventHandler(async (event) => {
  const id = event.context.params.id;
  const client = await serverSupabaseClient(event);

  const { error } = await client.from("task_notes").delete().eq("id", id);
  if (error) return error;
})
