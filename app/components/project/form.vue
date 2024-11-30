<template>
  <div class="bg-gray-100 min-h-screen flex items-center justify-center">
    <div class="w-full max-w-xl bg-white p-8 shadow-lg rounded-md">
      <h1 class="text-2xl font-semibold text-gray-800 mb-6 text-center">
        {{ $route.params.id ? "Proje Duzenle" : "Proje Ekle" }}
      </h1>
      <form @submit.prevent="onSubmit" class="space-y-4">
        <!-- Proje Adı -->
        <div>
          <field-text field-name="name" field-label="Proje Adı" />
        </div>

        <!-- Açıklama -->
        <div>
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

        <!-- Başlangıç Tarihi -->
        <div>
          <field-date field-name="start_date" field-label="Başlangıç Tarihi" />
        </div>

        <!-- Bitiş Tarihi -->
        <div>
          <field-date field-name="end_date" field-label="Bitiş Tarihi" />
        </div>

        <!-- Gönder Butonu -->
        <div class="text-center">
          <button
            type="submit"
            class="px-6 py-2 bg-blue-600 text-white rounded-md shadow-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          >
          {{ $route.params.id ? "Proje Düzenle" : "Proje Olustur" }}
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

const statuses = ref([
  { label: "Planlanmış", value: "planned" },
  { label: "Devam Ediyor", value: "in_progress" },
  { label: "Tamamlanmış", value: "completed" },
]);
</script>
