<template>
  <div
    class="
      h-100
      w-full
      flex
      items-center
      justify-center
      bg-teal-lightest
      font-sans
    "
  >
    <div class="bg-white rounded shadow p-6 m-4 w-full lg:w-3/4 lg:max-w-lg">
      <div class="mb-4">
        <h1 class="text-grey-darkest">Todo List</h1>
        <div class="flex mt-4">
          <input
            class="
              shadow
              appearance-none
              border
              rounded
              w-full
              py-2
              px-3
              mr-4
              text-grey-darker
            "
            v-model="state.todoValue"
            placeholder="Add Todo"
          />
          <button
            @click="addTodo()"
            class="
              flex-no-shrink
              p-2
              border-2
              rounded
              text-teal
              border-teal
              hover:text-cyan-500 hover:bg-teal
            "
          >
            Add
          </button>
        </div>
      </div>
      <div v-for="(todo, index) in todos" :key="todo.id">
        <div class="flex mb-4 items-center">
          <p
            :class="
              todo.isDone
                ? 'w-full line-through text-green'
                : 'w-full text-grey-darkest'
            "
          >
            {{ index + 1 }}
          </p>
          <p
            :class="
              todo.isDone
                ? 'w-full line-through text-green'
                : 'w-full text-grey-darkest'
            "
          >
            {{ todo.title }}
          </p>
          <button
            @click="isDoneFunc(todo, index)"
            class="
              flex-no-shrink
              p-2
              ml-4
              mr-2
              border-2
              rounded
              hover:text-yellow-500
              text-green
              border-green
              hover:bg-green
            "
          >
            Done
          </button>
          <button
            @click="removeTodo(todo.id)"
            class="
              flex-no-shrink
              p-2
              ml-2
              border-2
              rounded
              text-red
              border-red
              hover:text-red-500 hover:bg-red
            "
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  </div>
</template>


<script setup>
import { storeToRefs } from "pinia";
import { reactive } from "vue";
import useTodoStore from "../store/todo";

const state = reactive({
  todoValue: "",
});

const { todos } = storeToRefs(useTodoStore());
const todoStore = useTodoStore();

todoStore.loadTodos();

const addTodo = () => {
  todoStore.addTodo({ title: state.todoValue, description: "", isDone: false });
  state.todoValue = "";
};

const removeTodo = (id) => {
  todoStore.removeTodo(id);
};

const isDoneFunc = (value, index) => {
  value.isDone = !value.isDone;
  todoStore.isDoneEdit(value);
};
</script>