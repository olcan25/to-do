import { serverSupabaseClient } from "#supabase/server";

export default defineEventHandler(async (event) => {
  const id = event.context.params.id;
  const client = await serverSupabaseClient(event);

  const body = await readBody(event);

  const { data, error } = await client
    .from("task_notes")
    .update(body)
    .eq("id", id)
    .select()
    .single();

  if (error) return error;

  return { data, message: "Task note updated" };
});
