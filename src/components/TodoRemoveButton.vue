<template>
  <button
  type="button"
    @click="removeTodo(id)"
    class="flex text-red-500 border-2 border-red-500 p-2 rounded-lg"
  >
    <svg
      class="h-6 w-6 text-red-500"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="15" y1="9" x2="9" y2="15" />
      <line x1="9" y1="9" x2="15" y2="15" />
    </svg>
    <span>Sil</span>
  </button>
</template>

<script setup>
import useTodoStore from "../store/todo";
const props = defineProps(['id'])


const {removeTodo} = useTodoStore()

</script>
