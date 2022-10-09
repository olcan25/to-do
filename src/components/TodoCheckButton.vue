<template>
  <div class="p-2">
    <input
      type="checkbox"
      class="h-6 w-6"
      v-model="todo.isDone"
      @click="isDoneEdit(todo)"
    />
  </div>
</template>

<script setup>
import useTodoStore from "../store/todo";
const props = defineProps(["todo"]);

const { isDoneEdit } = useTodoStore();
</script>
