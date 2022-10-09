<template>
  <form @submit="handleSubmit">
    <div class="w-full h-screen bg-gray-100 pt-8">
      <div class="bg-white p-3 max-w-md mx-auto">
        <div class="text-center">
          <h1 class="text-3xl font-bold">ToDo App</h1>
          <div class="mt-4 flex mb-4">
            <TodoInput v-model="title" :error="errorTitle" />
            <TodoAddButton />
          </div>
          <TodoErrorMessage :error="errorTitle" />
        </div>
        <div class="mt-8">
          <ul>
            <TodoList v-for="todo in todos" :key="todo.id" :todo="todo" />
          </ul>
        </div>
        <TodoFooter :todos="todos" />
      </div>
    </div>
  </form>
</template>




<script setup>
//npm packages
import { storeToRefs } from "pinia";
import useTodoStore from "../store/todo";
import { useForm } from "@vorms/core";
import { yupResolver } from "@vorms/resolvers/yup";
import * as yup from "yup";

//custom components
import TodoInput from "../components/TodoInput.vue";
import TodoAddButton from "../components/TodoAddButton.vue";
import TodoList from "../components/TodoList.vue";
import TodoFooter from "../components/TodoFooter.vue";
import TodoErrorMessage from "../components/TodoErrorMessage.vue";

const schema = yup.object({
  title: yup
    .string()
    .required("Bos olamaz.")
    .min(5, "En az 5 karakter olmalıdır.")
    .max(25, "En fazla 25 karakterli olmalıdır."),
});

const { register, handleReset, handleSubmit, errors, setValues } = useForm({
  initialValues: {
    title: "",
    description: "",
    isDone: false,
  },
  validate: yupResolver(schema),
  onSubmit(value) {
    addTodo(value);
  },
});

const { value: title, error: errorTitle } = register("title");


const { todos } = storeToRefs(useTodoStore());
const { addTodo, loadTodos } = useTodoStore();

loadTodos();
</script>