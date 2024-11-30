<template>
  <project-form @submit="onSubmit" />
</template>

<script setup>
definePageMeta({
  middleware: "auth",
});

const projectStore = useProjectStore();

const { handleSubmit, setFieldValue } = useForm({
  validationSchema: toTypedSchema(projectSchema),
  initialValues: {
    name: "",
    description: "",
    status: "planned",
    start_date: "",
    end_date: null,
  },
});
setFieldValue("status", "planned");

const onSubmit = handleSubmit(async (values) => {
  await projectStore.createProject(values);

  navigateTo("/projects");
});
</script>
