<template>
  <div class="bg-gray-100 min-h-screen flex flex-col">
    <header class="text-white py-4">
      <div class="container mx-auto px-4 flex items-center justify-between">
        <!-- Başlık -->
        <h1 class="text-2xl font-bold text-black">Projeler</h1>

        <!-- Ekle Butonu -->
        <nuxt-link
          to="/projects/create"
          class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md shadow focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          Ekle
        </nuxt-link>
      </div>
    </header>

    <main class="flex-grow container mx-auto px-4 py-6 overflow-auto">
      <div class="bg-white shadow-md rounded-lg overflow-hidden">
        <table class="w-full border-collapse table-auto">
          <thead class="bg-blue-600 text-white sticky top-0">
            <tr>
              <th class="px-4 py-2 text-left text-sm font-semibold">
                Proje Adı
              </th>
              <th class="px-4 py-2 text-left text-sm font-semibold">
                Açıklama
              </th>
              <th class="px-4 py-2 text-left text-sm font-semibold">Durum</th>
              <th class="px-4 py-2 text-left text-sm font-semibold">
                Başlangıç Tarihi
              </th>
              <th class="px-4 py-2 text-left text-sm font-semibold">
                Bitiş Tarihi
              </th>
              <th class="px-4 py-2 text-center text-sm font-semibold">
                Eylemler
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="project in projects"
              :key="project.id"
              class="hover:bg-gray-100 even:bg-gray-50"
            >
              <td class="px-4 py-2 border-b text-sm text-gray-800">
                {{ project.name }}
              </td>
              <td class="px-4 py-2 border-b text-sm text-gray-800">
                {{ project.description }}
              </td>
              <td class="px-4 py-2 border-b text-sm text-gray-800">
                <span
                  :class="{
                    'text-blue-600': project.status === 'planned',
                    'text-yellow-600': project.status === 'in_progress',
                    'text-green-600': project.status === 'completed',
                  }"
                >
                  {{ formatStatus(project.status) }}
                </span>
              </td>
              <td class="px-4 py-2 border-b text-sm text-gray-800">
                {{ formatDate(project.start_date) }}
              </td>
              <td class="px-4 py-2 border-b text-sm text-gray-800">
                {{ formatDate(project.end_date) }}
              </td>
              <td class="px-4 py-2 border-b text-center">
                <button
                  @click="editProject(project.id)"
                  class="px-3 py-1 text-sm bg-yellow-500 text-white rounded-md hover:bg-yellow-600"
                >
                  Düzenle
                </button>
                <button
                  @click="deleteProject(project.id)"
                  class="px-3 py-1 text-sm bg-red-500 text-white rounded-md hover:bg-red-600 ml-2"
                >
                  Sil
                </button>

                <nuxt-link
                  :to="`/projects/${project.id}/tasks`"
                  class="px-3 py-1 text-sm bg-blue-500 text-white rounded-md hover:bg-blue-600 ml-2"
                >
                  Görevler
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
definePageMeta({
  middleware: "auth",
});

const projectStore = useProjectStore();
const { projects } = storeToRefs(projectStore);
await projectStore.fetchProjects();

// Durum formatlama
const formatStatus = (status) => {
  switch (status) {
    case "planned":
      return "Planlanmış";
    case "in_progress":
      return "Devam Ediyor";
    case "completed":
      return "Tamamlanmış";
    default:
      return "Bilinmiyor";
  }
};

// Düzenleme ve silme işlemleri
const editProject = (id) => {
  navigateTo(`/projects/update/${id}`);
};

const deleteProject = async (id) => {
  await projectStore.deleteProject(id);
};

const { formatDate } = useDateFormatter();
</script>
