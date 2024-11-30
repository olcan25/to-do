<template>
  <task-form @submit="onSubmit" :getProjectOptions />
</template>

<script setup>
const projectId = Number(useRoute().params.id);
const taskId = Number(useRoute().params.taskId);

definePageMeta({
  middleware: "auth",
});

const projectStore = useProjectStore();
const taskStore = useTaskStore();
const { project } = storeToRefs(projectStore);
const { task } = storeToRefs(taskStore);
await projectStore.fetchProject(projectId);
await taskStore.fetchTask(taskId);

const { handleSubmit, setValues } = useForm({
  validationSchema: toTypedSchema(taskSchema),
  initialValues: {
    project_id: 0,
    title: "",
    description: "",
    status: "to_do",
    priority: "low",
    due_date: "",
  },
});
setValues(task.value);

// Form Gönderimi
const onSubmit = handleSubmit(async (values) => {
  delete values.id;
  const result = await taskStore.updateTask(taskId, values);
  navigateTo(`/projects/${projectId}/tasks`);
});

const getProjectOptions = computed(() => [
  { value: project.value.id, label: project.value.name },
]); // getProjectOptions props degeri
</script>

<style></style>
