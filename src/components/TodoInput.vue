<template>
  <input
    class="w-80 border-b-2 border-gray-500 text-black"
    type="text"
    placeholder="Görevinizi buraya giriniz"
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
  />
</template>

<script setup>

defineProps({
  modelValue: String,
});
// defines what events our component emits
defineEmits(["update:modelValue"]);
</script>
