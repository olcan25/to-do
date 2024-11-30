<template>
  <div class="bg-gray-100 min-h-screen flex items-center justify-center">
    <div class="w-full max-w-3xl bg-white p-8 shadow-lg rounded-lg">
      <h1 class="text-3xl font-semibold text-gray-800 mb-8 text-center">
        {{ $route.params.taskId ? "Görev Duzenle" : "Görev Ekle" }}
      </h1>
      <form
        @submit.prevent="onSubmit"
        class="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        <!-- Proje -->
        <div class="col-span-1 md:col-span-2">
          <field-select
            field-name="project_id"
            field-label="Proje"
            :items="getProjectOptions"
            :disabled="true"
          />
        </div>

        <!-- Görev Başlığı -->
        <div>
          <field-text field-name="title" field-label="Görev Başlığı" />
        </div>

        <!-- Öncelik -->
        <div>
          <field-select
            field-name="priority"
            field-label="Öncelik"
            :items="priorities"
          />
        </div>

        <!-- Açıklama -->
        <div class="col-span-1 md:col-span-2">
          <field-text-area field-name="description" field-label="Açıklama" />
        </div>

        <!-- Durum -->
        <div>
          <field-select
            field-name="status"
            field-label="Durum"
            :items="statuses"
          />
        </div>

        <!-- Teslim Tarihi -->
        <div>
          <field-date field-name="due_date" field-label="Teslim Tarihi" />
        </div>

        <!-- Gönder Butonu -->
        <div class="col-span-1 md:col-span-2 text-center">
          <button
            type="submit"
            class="w-full md:w-auto px-6 py-3 bg-blue-600 text-white font-medium rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            {{ $route.params.taskId ? "Görev Duzenle" : "Görev Ekle" }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
const emit = defineEmits(["submit"]);

const onSubmit = () => {
  emit("submit");
};

defineProps({
  getProjectOptions: {
    type: Array,
    default: () => [],
  },
});

const priorities = [
  { value: "low", label: "Düşük" },
  { value: "medium", label: "Orta" },
  { value: "high", label: "Yüksek" },
];

const statuses = [
  { value: "to_do", label: "Yapılacak" },
  { value: "in_progress", label: "Devam Ediyor" },
  { value: "completed", label: "Tamamlandı" },
];
</script>
