<script setup>
defineProps(['modelValue'])
defineEmits(['update:modelValue'])
</script>

<template>
  <input
  class="py-2 px-3 border border-gray-400" 
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
  />
</template>