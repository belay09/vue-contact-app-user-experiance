<script setup>

import { useRouter} from "vue-router"
import {provide,ref} from 'vue'
const router = useRouter()

const editing = ref(false)
provide('rigister', editing)
</script>

<template>

<header class="bg-violet-800 py-3">
  <div class="container flex justify-between items-center">
    <button @click="router.push(`/`)" class="text-black ml-6 font-bold text-4xl hover:bg-violet-900 py-1 px-4 rounded-full">Todos</button>
    <button @click="editing = true
" class="bg-white hover:bg-gray-200 text-gray-800 font-bold py-2 px-4 rounded-full">register
    </button>
  </div>
</header>
  <!--<router-view :key="$route.path" />
  <usersList/>

  -->
  <RouterView />
  <footer class="bg-violet-800 text-black flex items-center justify-center py-2 fixed bottom-0 w-full">
  <p class="text-lg">Developed by <span class=" font-bold text-white">Belay Sirak Tsige</span></p>
</footer>

</template>