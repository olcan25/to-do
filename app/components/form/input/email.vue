<template>
  <label :for="fieldName" class="block text-sm font-medium text-gray-700">
    {{ fieldLabel }}
  </label>
  <input
    type="email"
    :id="fieldName"
    v-model="value"
    class="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
  />
</template>

<script setup>
const props = defineProps({
  fieldLabel: {
    type: String,
    default: "",
  },
  fieldName: {
    type: String,
    required: true,
  },
});

const { fieldName } = toRefs(props);

const { value } = useField(fieldName.value);
</script>

<style></style>
