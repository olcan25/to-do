<template>
  <li class="p-2 rounded-lg">
    <div class="flex align-middle flex-row justify-between">
      <TodoCheckButton :todo="todo" />
      <div class="p-2">
        <p
          :class="
            todo.isDone
            
              ? 'text-lg line-through text-gray-400'
              : 'text-lg text-black'
          "
        >
          {{ todo.title }}
        </p>
      </div>
      <TodoRemoveButton :id="todo.id" />
    </div>
    <hr class="mt-2" />
  </li>
</template>

<script setup>
import TodoRemoveButton from "./TodoRemoveButton.vue";
import TodoCheckButton from "./TodoCheckButton.vue";
const props = defineProps(["todo"]);
</script>
