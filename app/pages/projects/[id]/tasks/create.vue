<template>
  <task-form @submit="onSubmit" :getProjectOptions />
</template>

<script setup>
const projectId = Number(useRoute().params.id);

definePageMeta({
  middleware: "auth",
});

const projectStore = useProjectStore();
const taskStore = useTaskStore();
const { project } = storeToRefs(projectStore);
await projectStore.fetchProject(projectId);

const { handleSubmit, setValues } = useForm({
  validationSchema: toTypedSchema(taskSchema),
  initialValues: {
    project_id: 0,
    title: "",
    description: "",
    status: "to_do",
    priority: "low",
    due_date: null,
  },
});
setValues({
  project_id: projectId,
  status: "to_do",
  priority: "low",
});

// Form Gönderimi
const onSubmit = handleSubmit(async (values) => {
  const result = await taskStore.createTask(values);
  navigateTo(`/projects/${projectId}/tasks`);
});

const getProjectOptions = computed(() => [
  { value: project.value.id, label: project.value.name },
]); // getProjectOptions props degeri
</script>
