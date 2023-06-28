
<template>
    <div class="container mx-auto p-4">
      <h1 class="text-2xl mb-4">Contact List</h1>
      <button @click="logout" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mr-2 rounded-full">sign out</button>
       <div>
        <table class="table-auto w-full">
          <thead>
            <tr>
              <th class="px-4 py-2">Name</th>
              <th class="px-4 py-2">Address</th>
              <th class="px-4 py-2">Phone</th>
              <th class="px-4 py-2">Email</th>
              <th class="px-4 py-2">Actions</th>
            </tr>
          </thead> 
          <tbody v-if="loading">Loading...</tbody>
        <tbody v-else-if="error">Error: {{ error.message }}</tbody>
        <tbody v-else="result">

          <tr v-for="c in result" :key="c.id">
            <td class="border px-4 py-2">{{ result.value.name }}</td>
            <td class="border px-4 py-2">{{ c.address }}</td>
            <td class="border px-4 py-2">{{ c.phone }}</td>
            <td class="border px-4 py-2">{{ c.email }}</td>
            <td class="border px-4 py-2">
              <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mr-2 rounded-full">Edit</button>
              <button class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full">Delete</button>
            </td>
          </tr>
        </tbody> 
        </table>
      </div> 
      <h2 class="text-lg mt-8">Add New Contact</h2>
      <form @submit.prevent="addContact">
        <div class="grid grid-cols-2 gap-4">
          <input v-model="name" type="text" placeholder="Name" class="border border-gray-400 p-2 rounded" required>
          <input v-model="address" type="text" placeholder="Address" class="border border-gray-400 p-2 rounded" required>
          <input v-model="phone" type="number" placeholder="Phone" class="border border-gray-400 p-2 rounded" required>
          <input v-model="email" type="email" placeholder="Email" class="border border-gray-400 p-2 rounded" required>
        </div>
        <button type="submit" class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 mt-4 rounded-full">Add Contact</button>
      </form>
    
  </div>
  </template>
  
  <script setup>
    import { useRouter,useRoute} from "vue-router"
    import { useQuery } from '@vue/apollo-composable'
    import gql from 'graphql-tag'
    import {ref,onMounted} from 'vue'
    import { loginqueries,findcontacts} from '../../query/query'
    import { provideApolloClient } from "@vue/apollo-composable";
  import apolloClient from '../../ApllloClient'
  const name = ref("");
  const address = ref("");
  const phone = ref("");
  const email = ref("");
  provideApolloClient(apolloClient);

    const route = useRoute()

    const router = useRouter()
  
 
      const logout = () => {
            window.localStorage.removeItem('accessToken');
            router.push('/');
        }
        const { error, loading, result } = useQuery(gql`
        query MyQuery {
  contacts {
    email
    phone
    owner_id
    name
    id
    address
  }
}`);
 
const a =ref(result)
console.log(result);


  
  </script>
  
  