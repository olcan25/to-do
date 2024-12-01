import { defineStore } from "pinia";
import { useToast } from "vue-toastification";

export const useTaskNoteStore = defineStore("task-note", () => {
  const $toast = useToast();
  const authStore = useAuthStore();
  const taskNotes = ref([]);
  const taskNote = ref(null);
  const error = ref(null);
  const message = ref(null);
  const isLoading = ref(false);

  const fetchTaskNotesByTaskId = async (taskId) => {
    if (isLoading.value) return; // Eğer veriler zaten yüklüyse tekrar yükleme
    try {
      const result = await $fetch(`/api/task-notes/tasks/${taskId}`, {
        headers: useRequestHeaders(["cookie"]),
      });
      taskNotes.value = result.data;
      isLoading.value = true;
    } catch (err) {
      error.value = err;
    }
  };

  const fetchTaskNote = async (id) => {
    try {
      const result = await $fetch(`/api/task-notes/${id}`, {
        headers: useRequestHeaders(["cookie"]),
        method: "GET",
      });
      taskNote.value = result.data;
    } catch (err) {
      error.value = err;
    }
  };

  const createTaskNote = async (data) => {
    data.created_by = authStore.user.id;
    try {
      const result = await $fetch("/api/task-notes/create", {
        method: "POST",
        body: data,
      });
      message.value = result.message;
      $toast.success("Not olusturuldu");
      taskNotes.value.push(result.data);
    } catch (err) {
      error.value = err;
    }
  };

  const deleteTaskNote = async (id) => {
    try {
      const result = await $fetch(`/api/task-notes/${id}`, {
        method: "DELETE",
      });
      $toast.success("Not silindi");
      taskNotes.value = taskNotes.value.filter((t) => t.id !== id);
      message.value = result.message;
    } catch (err) {
      error.value = err;
    }
  };

  const updateTaskNote = async (id, data) => {
    data.created_by = authStore.user.id;
    try {
      const result = await $fetch(`/api/task-notes/${id}`, {
        method: "PUT",
        body: data,
      });
      $toast.success("Not duzenlendi");
      message.value = result.message;
      taskNotes.value = taskNotes.value.map((t) => {
        if (t.id === id) {
          return { ...data, id };
        }
        return t;
      });
    } catch (err) {
      error.value = err;
    }
  };

  return {
    taskNotes,
    taskNote,
    error,
    message,
    isLoading,
    fetchTaskNotesByTaskId,
    fetchTaskNote,
    createTaskNote,
    deleteTaskNote,
    updateTaskNote,
  };
});
