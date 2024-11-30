<template>
  <label
    :for="fieldName"
    :class="[
      'block text-sm font-medium mb-1',
      errorMessage ? 'text-red-500' : 'text-gray-700',
    ]"
  >
    {{ fieldLabel }}
  </label>
  <input
    type="text"
    :id="fieldName"
    v-model="value"
    :class="[
      'block w-full px-3 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500',
      errorMessage
        ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
        : 'border-gray-300',
    ]"
    placeholder=""
  />
  <p v-if="errorMessage" class="text-red-500 text-xs mt-1">
    {{ errorMessage }}
  </p>
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

const { value, errorMessage } = useField(fieldName.value);
</script>

<style></style>
