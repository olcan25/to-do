<template>
  <div class="bg-gray-100 min-h-screen flex flex-col">
    <header class="text-white py-4">
      <div class="container mx-auto px-4 flex items-center justify-between">
        <!-- Başlık -->
        <h1 class="text-2xl font-bold text-black">Görevler</h1>

        <h1 class="text-2xl font-bold text-black">
          Proje : {{ project?.name }}
        </h1>

        <!-- Ekle Butonu -->
        <div class="flex items-center space-x-4">
          <nuxt-link
            :to="`/projects`"
            class="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
          >
            Geri Don
          </nuxt-link>
        <nuxt-link
          :to="`/projects/${id}/tasks/create`"
          class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md shadow focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          Görev Ekle
        </nuxt-link>
        </div>
      </div>
    </header>

    <main class="flex-grow container mx-auto px-4 py-6 overflow-auto">
      <div class="bg-white shadow-md rounded-lg overflow-hidden">
        <table class="w-full border-collapse table-auto">
          <thead class="bg-blue-600 text-white sticky top-0">
            <tr>
              <th class="px-4 py-2 text-left text-sm font-semibold">
                Görev Başlığı
              </th>
              <th class="px-4 py-2 text-left text-sm font-semibold">
                Açıklama
              </th>
              <th class="px-4 py-2 text-left text-sm font-semibold">Durum</th>
              <th class="px-4 py-2 text-left text-sm font-semibold">Öncelik</th>
              <th class="px-4 py-2 text-left text-sm font-semibold">
                Teslim Tarihi
              </th>
              <th class="px-4 py-2 text-center text-sm font-semibold">
                Eylemler
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="task in tasks"
              :key="task.id"
              class="hover:bg-gray-100 even:bg-gray-50"
            >
              <td class="px-4 py-2 border-b text-sm text-gray-800">
                {{ task.title }}
              </td>
              <td class="px-4 py-2 border-b text-sm text-gray-800">
                {{ task.description }}
              </td>
              <td class="px-4 py-2 border-b text-sm text-gray-800">
                <span
                  :class="{
                    'text-blue-600': task.status === 'to_do',
                    'text-yellow-600': task.status === 'in_progress',
                    'text-green-600': task.status === 'completed',
                  }"
                >
                  {{ formatStatus(task.status) }}
                </span>
              </td>
              <td class="px-4 py-2 border-b text-sm text-gray-800">
                <span
                  :class="{
                    'text-red-500': task.priority === 'high',
                    'text-yellow-500': task.priority === 'medium',
                    'text-green-500': task.priority === 'low',
                  }"
                >
                  {{ formatPriority(task.priority) }}
                </span>
              </td>
              <td class="px-4 py-2 border-b text-sm text-gray-800">
                {{ formatDate(task.due_date) }}
              </td>
              <td class="px-4 py-2 border-b text-center">
                <button
                  @click="editTask(task.id)"
                  class="px-3 py-1 text-sm bg-yellow-500 text-white rounded-md hover:bg-yellow-600"
                >
                  Düzenle
                </button>
                <button
                  @click="deleteTask(task.id)"
                  class="px-3 py-1 text-sm bg-red-500 text-white rounded-md hover:bg-red-600 ml-2"
                >
                  Sil
                </button>

                <nuxt-link
                  :to="`/projects/${id}/tasks/${task.id}/notes`"
                  class="px-3 py-1 text-sm bg-blue-500 text-white rounded-md hover:bg-blue-600 ml-2"
                >
                  Notlar
                </nuxt-link>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </main>
  </div>
</template>

<script setup>
const { id } = useRoute().params;

definePageMeta({
  middleware: "auth",
});

const taskStore = useTaskStore();
const projectStore = useProjectStore();
const { project } = storeToRefs(projectStore);
const { tasks } = storeToRefs(taskStore);

onMounted(async () => {
  await projectStore.fetchProject(id);
  await taskStore.fetchTasksByProjectId(id);
});

// Durum formatlama
const formatStatus = (status) => {
  switch (status) {
    case "to_do":
      return "Yapılacak";
    case "in_progress":
      return "Devam Ediyor";
    case "completed":
      return "Tamamlandı";
    default:
      return "Bilinmiyor";
  }
};

// Öncelik formatlama
const formatPriority = (priority) => {
  switch (priority) {
    case "low":
      return "Düşük";
    case "medium":
      return "Orta";
    case "high":
      return "Yüksek";
    default:
      return "Bilinmiyor";
  }
};

// Görev düzenleme
const editTask = (taskId) => {
  navigateTo(`/projects/${id}/tasks/update/${taskId}`);
};

// Görev silme
const deleteTask = async (id) => {
   await taskStore.deleteTask(id);
};

const { formatDate } = useDateFormatter();
</script>

