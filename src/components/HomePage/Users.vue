<template class="bg-gray-100">
      <body class="bg-gray-100 mt-0">
<div v-if="loading"  class="flex justify-center items-center h-screen">
   <div class="animate-spin ease-linear rounded-full border-4 border-t-4 border-gray-800 h-24 w-24"></div>
   <div class="ml-3 text-gray-700">loading...</div>
</div>


<div v-else-if="error">Error: {{ error.message }}</div>

<div  v-else-if="result && result.users"  class="flex flex-wrap ml-16 mt-0">

<div v-for="users of result.users" class="ml-10 mt-2 mb-6 max-w-m bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-200">
    <div v-if="isDelateBoxVisible" class="fixed top-0 right-0 p-4 bg-red-600 text-white rounded-full">
user successfully Delated</div>
        <img class="ml-15 rounded-t-lg h-auto w-full" src="../../assets/pic.jpeg" alt="" />
    <div class="p-5 bg-gray-200 ">
            <h5 class="flex justify-center mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-black">{{users.name}}</h5>
        <p class="flex justify-center mb-3 font-normal text-gray-700 dark:text-gray-400"></p>
        <button @click="router.push(`/userTodo/${users.id}`)" class="ml-1 mt-4 bg-violet-800 hover:bg-violet-900 text-white font-bold py-2 px-4 rounded">
Todo list
</button>        <button @click="delate({id:users.id})" class="ml-1 mt-4 bg-red-700 hover:bg-red-900 text-white font-bold py-2 px-4 rounded">
Delate
</button>
    </div>

</div>
<div v-if="editing" class="absolute inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center">
      <div class="bg-white p-4 rounded">
        <input type="text" v-model="userName" class="py-2 px-3 border border-gray-400">
        <button class="bg-violet-800 hover:bg-violet-900 text-white py-2 px-4 ml-2 rounded"
         @click="  update({username:userName})">Rigister</button>
        <button class="bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 ml-2 rounded" 
        @click="cancelEdit()">Cancel</button>
      </div>
    </div>
    <div v-if="isSuccessBoxVisible" class="fixed top-0 right-0 p-4 bg-green-500 text-white rounded-full">
the user <span class="text-black" >{{userName}}</span> successfully created</div>

</div>
</body>
</template>
  <script setup>
  import { useQuery } from '@vue/apollo-composable'
  import { useRouter} from "vue-router"
  import gql from 'graphql-tag'
  import { provideApolloClient } from "@vue/apollo-composable";
  import apolloClient from '../../ApllloClient'
  import { useMutationhost } from '@vue/apollo-composable'
import {inject} from 'vue'
  import {ref, watch, onMounted } from 'vue'
  const router = useRouter()
  const editing = inject('rigister')
  const userName = ref("")
const isSuccessBoxVisible = ref(false);
const isDelateBoxVisible =ref(false)
      const { result ,loading,error,refetch} = useQuery(gql`
      query MyQuery {
 users {
   id
   img
   name
 }
}
    `)
    const cancelEdit = () => {
        editing.value = false
      }
 const update = async (data) => {
    console.log(data);
    editing.value = false;
    await addUser({username:data.username})
    showSuccessBox()
    await refetch();
    };
const delate = async (data) => {
    await delateUser({id: data.id});
   await refetch();
   showDelateBox()

}

function showSuccessBox() {
  isSuccessBoxVisible.value = true;
}
function showDelateBox() {
  isDelateBoxVisible.value = true;
}
onMounted(() => {
  watch(isSuccessBoxVisible, (newValue) => {
    if (newValue) {
      setTimeout(() => {
        isSuccessBoxVisible.value = false;
      }, 3000); // Adjust the time here (in milliseconds)
    }
  });
  watch(isDelateBoxVisible, (newValue) => {
    if (newValue) {
      setTimeout(() => {
        isDelateBoxVisible.value = false;
      }, 3000); // Adjust the time here (in milliseconds)
    }
  });
});

 const { mutate : addUser} = provideApolloClient(apolloClient)(() =>  useMutation(gql`
      mutation MyQuery($username: String!) {
        insert_users_one(object: { img: "../../assets/pic.jpeg", name: $username }) {
    name
    img
    id
  }
      }
    `
  ));
  const { mutate : delateUser} = provideApolloClient(apolloClient)(() =>  useMutation(gql`
mutation MyQuery ($id: Int!){
  delete_todos(where: {user_id: {_eq: $id}}) {
    affected_rows
  }
  delete_users_by_pk(id: $id) {
    name
  }
}

    `
  ));
    console.log(result.id); // check if there are any errors in the query
</script>