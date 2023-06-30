<script setup>

import { useRouter} from "vue-router"
import {provide, ref } from 'vue';
const isActive = ref(false);

const router = useRouter()
function member(){
   isActive.value = !isActive.value;
}
provide('open', isActive);
provide('Member', member);
const logout = () => {
            window.localStorage.removeItem('accessToken');
            router.push('/');
            member();
        }
</script>

<template>

<header class="bg-violet-800 py-3">
  <div class="container flex justify-between items-center">
    <button @click="router.push(`/`)" class="text-white ml-6 font-bold text-4xl hover:bg-violet-900 py-1 px-4 rounded-full">Contact App</button>
    <button v-if="isActive" @click="logout" class="bg-white hover:bg-teal-700 text-black font-bold py-3 px-6 mr-2 rounded-full">sign out</button>

    <!-- <button @click="editing = true
" class="bg-white hover:bg-gray-200 text-gray-800 font-bold py-2 px-4 rounded-full">register
    </button>-->
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