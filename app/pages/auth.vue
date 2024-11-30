<template>
  <div>
    <h1 class="text-2xl font-bold text-gray-900">Auth</h1>
  </div>
</template>

<script setup>

definePageMeta({
  middleware: "auth",
});

</script>

<style>

</style>