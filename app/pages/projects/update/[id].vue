<template>
  <project-form @submit="onSubmit" />
</template>

<script setup>
const id = Number(useRoute().params.id);

definePageMeta({
  middleware: "auth",
});

const projectStore = useProjectStore();
const { projects } = storeToRefs(projectStore);

const { handleSubmit, setValues } = useForm({
  validationSchema: toTypedSchema(projectSchema),
  initialValues: {
    name: "",
    description: "",
    status: "planned",
    start_date: "",
    end_date: null,
  },
});

const project = computed(() => projects.value.find((p) => p.id === id));
setValues(project.value);

const onSubmit = handleSubmit(async (values) => {
  delete values.id;
  await projectStore.updateProject(id, values);

  navigateTo("/projects");
});
</script>
