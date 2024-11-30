<template>
  <div class="bg-gray-100 min-h-screen flex flex-col">
    <header class="text-white py-4">
      <div class="container mx-auto px-4 flex items-center justify-between">
        <!-- Başlık -->
        <h1 class="text-2xl font-bold text-black">Görev Notları</h1>

        <h1 class="text-2xl font-bold text-black">
          Proje : {{ project?.name }}, Görev : {{ task?.title }}
        </h1>

        <!-- Ekle Butonu -->

        <div class="flex items-center space-x-4">
          <nuxt-link
            :to="`/projects/${id}/tasks`"
            class="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
          >
            Geri Don
          </nuxt-link>
          <button
            @click="showModal = true"
            class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Not Ekle
          </button>
        </div>

        <Modal v-if="showModal" :visible="showModal" @close="showModal = false">
          <template #title> Gorev Ekle </template>

          <field-text-area field-name="content" field-label="Içerik" />

          <template #footer>
            <button
              type="button"
              @click="onSubmit"
              class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Ekle
            </button>
            <button
              type="button"
              @click="showModal = false"
              class="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
            >
              Kapat
            </button>
          </template>
        </Modal>
      </div>
    </header>

    <main class="flex-grow container mx-auto px-4 py-6 overflow-auto">
      <div class="bg-white shadow-md rounded-lg overflow-hidden">
        <table class="w-full border-collapse table-auto">
          <thead class="bg-blue-600 text-white sticky top-0">
            <tr>
              <th class="px-4 py-2 text-left text-sm font-semibold">#</th>
              <th class="px-4 py-2 text-left text-sm font-semibold">İçerik</th>
              <th class="px-4 py-2 text-left text-sm font-semibold">
                Eylemler
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(note, index) in taskNotes"
              :key="note.id"
              class="hover:bg-gray-100 even:bg-gray-50"
            >
              <td class="px-4 py-2 border-b text-sm text-gray-800">
                {{ index + 1 }}
              </td>
              <td class="px-4 py-2 border-b text-sm text-gray-800">
                {{ note.content }}
              </td>
              <td class="px-4 py-2 border-b text-center">
                <!-- Not Ekle/Düzenle Formu -->
                <button
                  @click="onShowModalUpdate(note)"
               class="px-3 py-1 text-sm bg-yellow-500 text-white rounded-md hover:bg-yellow-600"
                >
                  Duzenle
                </button>

                <Modal
                  v-if="showModalUpdate"
                  :visible="showModalUpdate"
                  @close="showModalUpdate = false"
                >
                  <template #title> Görev Duzenle </template>

                  <field-text-area field-name="content" field-label="Içerik" />

                  <template #footer>
                    <button
                      @click="onSubmitUpdate({ id: note.id })"
                      class="px-3 py-1 text-sm bg-yellow-500 text-white rounded-md hover:bg-yellow-600"
                    >
                      Duzenle
                    </button>
                    <button
                      @click="showModalUpdate = false"
                      class="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
                    >
                      Kapat
                    </button>
                  </template>
                </Modal>

                <button
                  @click="taskNoteStore.deleteTaskNote(note.id)"
                  class="px-3 py-1 text-sm bg-red-500 text-white rounded-md hover:bg-red-600 ml-2"
                >
                  Sil
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </main>
  </div>
</template>

<script setup>
const taskId = Number(useRoute().params.taskId);
const id = Number(useRoute().params.id);

definePageMeta({
  middleware: "auth",
});

const taskNoteStore = useTaskNoteStore();
const projectStore = useProjectStore();
const taskStore = useTaskStore();
const { taskNotes } = storeToRefs(taskNoteStore);
const { tasks } = storeToRefs(taskStore);
const { projects } = storeToRefs(projectStore);
const { fetchTaskNotesByTaskId } = taskNoteStore;
const { fetchTasksByProjectId } = taskStore;
const { fetchProjects } = projectStore;
await fetchTaskNotesByTaskId(taskId);
await fetchTasksByProjectId(id);
await fetchProjects();
const showModal = ref(false);
const showModalUpdate = ref(false);

const task = computed(() => tasks.value.find((task) => task.id === taskId));
const project = computed(() =>
  projects.value.find((project) => project.id === id)
);

const { handleSubmit, setValues } = useForm({
  validationSchema: toTypedSchema(taskNoteSchema),
  initialValues: {
    task_id: 0,
    content: "",
  },
});

const onSubmit = handleSubmit(async (values) => {
  values.task_id = taskId;
  await taskNoteStore.createTaskNote(values);
  showModal.value = false;
});

const onShowModalUpdate = (data) => {
  setValues(data);
  showModalUpdate.value = true;
};

const onSubmitUpdate = handleSubmit(async (values, data) => {
  const task_id = taskId;
  await taskNoteStore.updateTaskNote(data.evt.id, { ...values, task_id });
  showModalUpdate.value = false;
});
</script>
