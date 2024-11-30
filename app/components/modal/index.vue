<template>
  <div
    v-if="visible"
    class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
  >
    <div class="bg-white w-full max-w-lg p-6 rounded-lg shadow-lg" @click.stop>
      <!-- Başlık -->
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-xl font-semibold text-gray-800">
          <slot name="title">Baslik</slot>
        </h2>
        <button
          @click="close"
          class="text-gray-400 hover:text-gray-600 focus:outline-none"
        >
          ✕
        </button>
      </div>

      <!-- İçerik -->
      <div class="mb-4">
        <slot>İçerik buraya gelecek</slot>
      </div>

      <!-- Ayak (Footer) -->
      <div class="flex justify-end space-x-4">
        <slot name="footer">
          <button
            @click="close"
            class="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
          >
            İptal
          </button>
        </slot>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  visible: {
    type: Boolean,
    required: true,
  },
});

const emit = defineEmits(["close"]);

const close = () => {
  emit("close");
};
</script>
