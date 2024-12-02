import { serverSupabaseClient } from "#supabase/server";

export default defineEventHandler(async (event) => {
  const id = event.context.params.id;
  const client = await serverSupabaseClient(event);

  const { data, error } = await client
    .from("projects")
    .select(
      `
    name,
    status,
    tasks (  title,project_id, status, priority)
  `
    )
    .eq("id", id)
    .single();

  const { data: projectData,error: projectError } = await client
    .from("projects")
    .insert({ name: data.name, status: "planned" })
    .select()
    .single();
    console.error(projectError);

  //set tasks in status set 'to_do'
  data.tasks.forEach((task) => {
    task.status = "to_do";
    task.priority = "low";
    task.project_id = projectData.id;
  });

  const { data: taskData, error: taskError } = await client
    .from("tasks")
    .insert(data.tasks)
    .select();

  if (error) return error;

  return { data };
});
