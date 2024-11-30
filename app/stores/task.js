import { defineStore } from "pinia";

export const useTaskStore = defineStore("task", () => {
  const authStore = useAuthStore();
  const taskNotesStore = useTaskNoteStore();
  const tasks = ref([]);
  const task = ref(null);
  const error = ref(null);
  const message = ref(null);
  const isLoading = ref(false);

  const fetchTasksByProjectId = async (projectId) => {
    if (isLoading.value) return; // Eğer veriler zaten yüklüyse tekrar yükleme
    try {
      const result = await $fetch(`/api/tasks/projects/${projectId}`, {
        headers: useRequestHeaders(["cookie"]),
      });
      tasks.value = result.data;
      isLoading.value = true;
    } catch (err) {
      error.value = err;
    }
  };

  const fetchTask = async (id) => {
    try {
      const result = await $fetch(`/api/tasks/${id}`, {
        headers: useRequestHeaders(["cookie"]),
        method: "GET",
      });
      task.value = result.data;
    } catch (error) {
      console.error("Hata:", error);
      error.value = error;
    }
  };

  const createTask = async (data) => {
    data.assigned_to = authStore.user.id;
    try {
      const result = await $fetch("/api/tasks/create", {
        method: "POST",
        body: data,
      });

      message.value = result.message;

      tasks.value.push(result.data);
    } catch (err) {
      error.value = err;
    }
  };

  const deleteTask = async (id) => {
    try {
      const result = await $fetch(`/api/tasks/${id}`, {
        method: "DELETE",
      });
      tasks.value = tasks.value.filter((t) => t.id !== id);
      taskNotesStore.taskNotes = taskNotesStore.taskNotes.filter(
        (note) => note.task_id !== id
      )
      message.value = result.message;
    } catch (err) {
      error.value = err;
    }
  };

  const updateTask = async (id, data) => {
    data.assigned_to = authStore.user.id;
    try {
      const result = await $fetch(`/api/tasks/${id}`, {
        method: "PUT",
        body: data,
      });
      message.value = result.message;

      tasks.value = tasks.value.map((t) => {
        if (t.id === id) {
          return { ...data, id };
        }
        return t;
      });
    } catch (err) {
      console.error(err);
      error.value = err;
    }
  };

  return {
    tasks,
    task,
    error,
    message,
    fetchTasksByProjectId,
    fetchTask,
    createTask,
    deleteTask,
    updateTask,
  };
});
