<template>
  <div class="bg-gray-100 min-h-screen flex flex-col">
    <header class="text-white py-4">
      <div class="container mx-auto px-4 flex items-center justify-between">
        <h1 class="text-2xl font-bold text-black">Projeler</h1>
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
        <!-- Büyük cihazlar için tablo görünümü -->
        <table class="w-full border-collapse table-auto hidden lg:table">
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
              v-for="project in sortedProjects"
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
                <button
                  @click="projectStore.fetchProjectByIdIncludeTasks(project.id)"
                  class="px-3 py-1 text-sm bg-green-500 text-white rounded-md hover:bg-green-600 ml-2"
                >
                  <repeat-svg />
                </button>
              </td>
            </tr>
          </tbody>
        </table>

        <!-- Mobil ve tablet cihazlar için liste görünümü -->
        <div
          v-for="project in sortedProjects"
          :key="project.id"
          class="block lg:hidden border-b p-4"
        >
          <h3 class="text-lg font-bold">{{ project.name }}</h3>
          <p class="text-sm text-gray-600">{{ project.description }}</p>
          <p class="text-sm">
            Durum:
            <span
              :class="{
                'text-blue-600': project.status === 'planned',
                'text-yellow-600': project.status === 'in_progress',
                'text-green-600': project.status === 'completed',
              }"
            >
              {{ formatStatus(project.status) }}
            </span>
          </p>
          <p class="text-sm">Başlangıç: {{ formatDate(project.start_date) }}</p>
          <p class="text-sm">Bitiş: {{ formatDate(project.end_date) }}</p>
          <div class="flex mt-2">
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
            <button
              @click="projectStore.fetchProjectByIdIncludeTasks(project.id)"
              class="px-3 py-1 text-sm bg-green-500 text-white rounded-md hover:bg-green-600 ml-2"
            >
              <repeat-svg />
            </button>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import RepeatSvg from "~/assets/svg/repeat.svg";
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

// Projeleri sıralama
const sortedProjects = computed(() =>
  [...projects.value].sort((a, b) => {
    const order = { planned: 1, in_progress: 2, completed: 3 };
    return order[a.status] - order[b.status];
  })
);

// Düzenleme ve silme işlemleri
const editProject = (id) => {
  navigateTo(`/projects/update/${id}`);
};

const deleteProject = async (id) => {
  await projectStore.deleteProject(id);
};

const { formatDate } = useDateFormatter();
</script>
