<script setup>
import {provide, ref } from 'vue';
import apol from './components/HomePage/apol.vue';
const isActive = ref(true);
function logical(){
   isActive.value = !isActive.value;
}
provide('open', isActive);
provide('logical', logical);
</script>

<template>
  <apol/>
</template>