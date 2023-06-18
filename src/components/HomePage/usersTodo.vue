
<template class="bg-gray-50">

  <div class="max-w-md mx-auto mt-5 px-4 bg-gray-200 h-full ">
    <h1 class="text-2xl font-bold mb-4">Todo App</h1>
    <form @submit.prevent="addTodo">
      <div class="mb-4">
	<input v-model="taskAdd" placeholder="edit me" class="py-2 px-3 border border-gray-400" />
        <button class="bg-green-500 hover:bg-green-600 text-white py-2 px-4 ml-2 rounded"
         @click="  insert({value : taskAdd});refetch()">
         Add Todo
        </button>
      </div>
    </form>
<div v-if="loading"  class="flex justify-center items-center h-screen">
   <div class="animate-spin ease-linear rounded-full border-4 border-t-4 border-gray-800 h-24 w-24"></div>
   <div class="ml-3 text-gray-700">loading...</div>
</div>

<div v-else-if="error">Error: {{ error.message }}</div>

    <ul v-else-if="result && result.todos">

      <li v-for="todo in result.todos" :key="todo.id"
       class="flex items-center justify-between bg-gray-100 rounded px-4 py-2 mb-3">
        <button>
          <span :class="{'line-through': todo.done}"
           @click="toggle({done:!todo.done,userid:$route.params.id,id:todo.id})">
           {{ todo.task }}</span>
        </button>
        <div>
          <button class="bg-blue-500 hover:bg-blue-600 text-white py-1 px-2 mr-2 rounded" 
           @click="edit(todo.id)">Edit</button>
          <button class="bg-red-500 hover:bg-red-600 text-white py-1 px-2 rounded" 
          @click="  delate({id : todo.id})">Delete</button>
        </div>
      </li>
    </ul>
    <div v-if="editing" class="absolute inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center">
      <div class="bg-white p-4 rounded">
        <input type="text" v-model="editText" class="py-2 px-3 border border-gray-400">
        <button class="bg-violet-800 hover:bg-violet-900 text-white py-2 px-4 ml-2 rounded"
         @click="  update({text : editText,id: taskId})">Save</button>
        <button class="bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 ml-2 rounded" 
        @click="cancelEdit()">Cancel</button>
      </div>
    </div>
  </div>
  <div v-if="isInfoBoxVisible" class="fixed top-0 right-0 p-4 bg-red-500 text-white rounded-full">
the todo task
successfully delated
</div>

</template>
<script setup>
import {useRoute, useRouter} from "vue-router"
import gql from 'graphql-tag'
import { provideApolloClient } from "@vue/apollo-composable";
import { useQuery } from '@vue/apollo-composable'
import { useMutation } from '@vue/apollo-composable'
import { ref , watch, onMounted } from 'vue'
import apolloClient from '../../ApllloClient'
  
const route = useRoute()
const editing = ref(false)
const editText = ref('')
const taskAdd = ref('')
const taskId = ref()
const isInfoBoxVisible = ref(false);
function showInfoBox() {
  isInfoBoxVisible.value = true;
}

onMounted(() => {
  watch(isInfoBoxVisible, (newValue) => {
    if (newValue) {
      setTimeout(() => {
        isInfoBoxVisible.value = false;
      }, 3000); // Adjust the time here (in milliseconds)
    }
  });
});
const edit = (id) => {
        editing.value = true
        taskId.value=id
        console.log(parseInt(taskId.value))
      }
      const cancelEdit = () => {
        editing.value = false

      }
      const delate = async (data) => {
        console.log(data.id);
      await delateTodo({id:data.id});

      await showInfoBox();
      await refetch();

    };
      const { mutate: delateTodo} = provideApolloClient(apolloClient)(() =>   useMutation(gql`
      mutation MyQuery ($id: Int!){  
        delete_todos_by_pk(id: $id) {
    done
  }
}
    `))
    const update = async (data) => {
        console.log(data.text);
        editing.value = false;

        await updateTodo({text:data.text,id:data.id});

      
      await refetch();
    };

      const { mutate: updateTodo} = provideApolloClient(apolloClient)(() =>   useMutation(gql`
      mutation MyQuery ($text: String!,$id: Int!){  
        update_todos_by_pk(pk_columns: {id: $id}, _set: {task: $text}) {
    id
  }
}
    `))
    const insert = async (data) => {
        console.log(data);

        await insertTodo({value:data.value});

      
      await refetch();
    };
const { mutate: insertTodo} = provideApolloClient(apolloClient)(() =>   useMutation(gql`
      mutation MyQuery ($value: String!){  
        insert_todos_one(object: {done: false, task: $value, user_id:${route.params.id}}) {
    id
  }
}
    `))


  const { result , loading, error , refetch } = useQuery(gql`
    query MyQuery{
      todos(where: {user_id: {_eq: ${route.params.id}}}, order_by: {id: asc}) {
        id
        task
        user_id
        done
      }
    }`
);

const toggle = async (data) => {
        console.log(data);

        await toggledone({done:data.done,userid:data.userid,id:data.id});

      
      await refetch();
    };
 
      const { mutate: toggledone} = provideApolloClient(apolloClient)(() =>   useMutation(gql`
      mutation MyQuery($done:Boolean!,$userid:Int,$id:Int) {
  update_todos(_set: {done: $done}, where: {user_id: {_eq: $userid}, id: {_eq: $id}}) {
    affected_rows

  }
}
    `) )
    console.log(taskAdd.value)
    

  

</script>

<style>
.line-through { text-decoration: line-through; }
.full-height-div {
        height: 100%;
        margin: 0;
        padding: 0;
    }
</style>

