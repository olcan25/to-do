import { defineStore } from "pinia";
import { useToast } from 'vue-toastification';

export const useProjectStore = defineStore("project", () => {
  const toast = useToast(); // Toast'ları kullanmak için
  const authStore = useAuthStore();
  const taskStore = useTaskStore();
  const taskNotesStore = useTaskNoteStore();
  const project = ref(null);
  const projects = ref([]);
  const error = ref(null);
  const message = ref(null);
  const isLoading = ref(false);

  const fetchProjects = async () => {
    if (isLoading.value) return; // Eğer veriler zaten yüklüyse tekrar yükleme
    try {
      const { data } = await $fetch("/api/projects", {
        headers: useRequestHeaders(["cookie"]),
        method: "GET",
      });
      projects.value = data;
      isLoading.value = true;
    } catch (err) {
      error.value = err;
    }
  };

  const fetchProject = async (id) => {
    try {
      const { data } = await $fetch(`/api/projects/${id}`, {
        headers: useRequestHeaders(["cookie"]),
        method: "GET",
      });
      project.value = data;
    } catch (err) {
      error.value = err;
    }
  };

  const createProject = async (data) => {
    try {
      data.owner_id = authStore.user.id;
      const result = await $fetch("/api/projects/create", {
        method: "POST",
        body: data,
      });

      toast.success("Proje olusturuldu");

      projects.value.push(result.data);
      navigateTo("/projects");
    } catch (err) {
      error.value = err;
    }
  };

  const deleteProject = async (id) => {
    try {
      const result = await $fetch(`/api/projects/${id}`, {
        method: "DELETE",
      });
      // 1. Proje listesinden sil
      projects.value = projects.value.filter((p) => p.id !== id);

      // 2. Silinecek task ID'lerini topla
      const removedTaskIds = taskStore.tasks
        .filter((task) => task.project_id === id)
        .map((task) => task.id);

      // 3. Task listesini filtreleyerek güncelle
      taskStore.tasks = taskStore.tasks.filter(
        (task) => task.project_id !== id
      );
      // 4. Task notlarını filtreleyerek güncelle
      taskNotesStore.taskNotes = taskNotesStore.taskNotes.filter(
        (note) => !removedTaskIds.includes(note.task_id)
      );

      toast.success("Proje silindi");
    } catch (err) {
      error.value = err;
    }
  };

  const updateProject = async (id, data) => {
    try {
      data.owner_id = authStore.user.id;
      const result = await $fetch(`/api/projects/${id}`, {
        method: "PUT",
        body: data,
      });

      projects.value = projects.value.map((p) => {
        if (p.id === id) {
          return { ...data, id };
        }
        return p;
      });

      toast.success("Proje düzenlendi");
    } catch (err) {
      error.value = err;
    }
  };

  return {
    project,
    projects,
    error,
    message,
    isLoading,
    fetchProjects,
    fetchProject,
    createProject,
    deleteProject,
    updateProject,
  };
});
