<template>
  <div class="mt-8">
    <button
      type="button"
      class="border-2 border-indigo-500 p-2 text-indigo-500 ml-4"
      @click="removeAll(todos)"
    >
      Tumunu Sil
    </button>
  </div>
</template>

<script setup>
import useTodoStore from "../store/todo";
defineProps(['todos'])

const { removeAll } = useTodoStore();
</script>
