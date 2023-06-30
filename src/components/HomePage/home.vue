
<template>
    <div class="container mx-auto p-4">
      <h1 class="text-2xl mb-4">{{data}}</h1>
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

          <tr v-for="c in result.contacts" :key="c.id">
            <td class="border px-4 py-2">{{ c.name }}</td>
            <td class="border px-4 py-2">{{ c.address }}</td>
            <td class="border px-4 py-2">{{ c.phone }}</td>
            <td class="border px-4 py-2">{{ c.email }}</td>
            <td class="border px-4 py-2">
              <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mr-2 rounded-full" @click="edit(c.id)">Edit</button>
              <button class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full" @click="delate({id : c.id})">Delete</button>
            </td>
            <div v-if="editing" class="absolute inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center">
      <div class="bg-white p-4 rounded">
        <input type="text" v-model="nameEdit" placeholder="Name" class="py-2 px-3 border border-gray-400">
        <input type="text" v-model="addressEdit" placeholder="Address" class="py-2 px-3 border border-gray-400">
        <input type="text" v-model="phoneEdit" placeholder="Phone" class="py-2 px-3 border border-gray-400">
        <input type="text" v-model="emailEdit" placeholder="Email" class="py-2 px-3 border border-gray-400">

        <button class="bg-violet-800 hover:bg-violet-900 text-white py-2 px-4 ml-2 rounded"
         @click="  update({nameEdit : nameEdit,addressEdit: addressEdit,phoneEdit:phoneEdit,emailEdit:emailEdit,id:c.id})">Save</button>
        <button class="bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 ml-2 rounded" 
        @click="cancelEdit()">Cancel</button>
      </div>
    </div>
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
        <button type="submit" class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 mt-4 rounded-full" @click="insert({name : name,address: address,phone:phone,email:email})">Add Contact</button>
      </form>
      <div v-if="isDelateVisible" class="fixed top-0 right-0 p-5 bg-red-500 text-white rounded-full" style="border-top-right-radius: 50px; border-bottom-right-radius: 50px;">
the contact
successfully delated
</div>
<div v-if="isAddSuccess" class="fixed top-0 right-0 p-5 bg-green-500 text-white rounded-full"  style="border-top-right-radius: 50px; border-bottom-right-radius: 50px;">
the contact
successfully added to database
</div>
<div v-if="isUpdateSuccess" class="fixed top-0 right-0 p-5 bg-green-500 text-white rounded-full" style="border-top-right-radius: 50px; border-bottom-right-radius: 50px;">
the contact
successfully updated
</div>
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
import { loginqueries,findcontacts} from '../../query/query'
 const editing = ref(false)
 const isDelateVisible=ref(false)
const editText = ref('')
const nameEdit = ref("");
  const addressEdit  = ref("");
  const phoneEdit  = ref("");
  const emailEdit  = ref("");
  const name = ref("");
  const address = ref("");
  const phone = ref("");
  const email = ref("");
  const isAddSuccess=ref(false);
  const isUpdateSuccess=ref(false);
  provideApolloClient(apolloClient);
    const route = useRoute()
    const router = useRouter()
    onMounted(() => {
    watch(isDelateVisible, (newValue) => {
      if (newValue) {
        setTimeout(() => {
          isDelateVisible.value = false;
        }, 3000);
      }
    });
    watch(isUpdateSuccess, (newValue) => {
      if (newValue) {
        setTimeout(() => {
          isUpdateSuccess.value = false;
        }, 3000);
      }
    });
    watch(isAddSuccess, (newValue) => {
      if (newValue) {
        setTimeout(() => {
          isAddSuccess.value = false;
        }, 3000);
      }
    });
  });
    const { error, loading, result ,refetch} = useQuery(gql`
        query MyQuery {
  contacts {
    email
    phone
    owner_id
    name
    id
    address
  }
}
`);
const insert = async (data) => {
        console.log(data);
        const id=route.params.id
        await insertcontact({name:data.name,address:data.address,phone:data.phone.toString(),email:data.email,id:id});
        showAddBox();
      
      await refetch();
    };
const { mutate: insertcontact} = provideApolloClient(apolloClient)(() =>   useMutation(gql`
mutation MyQuery ($id: uuid!,$phone: String!,$email: String!,$name:String!,$address:String!){
  insert_contacts_one(object: {address: $address, email: $email, name: $name, owner_id: $id, phone: $phone}) {
    id
  }
}
 `))


 
    const edit = (id) => {
        editing.value = true
        // taskId.value=id
        // console.log(parseInt(taskId.value))
      }
      const cancelEdit = () => {
        editing.value = false

      }

      const logout = () => {
            window.localStorage.removeItem('accessToken');
            router.push('/');
        }
const update = async (data) => {
  console.log("here good")
        console.log(data);
        editing.value = false;

        await updateTodo({id:data.id,name:data.nameEdit,email:data.emailEdit,phone:data.phoneEdit,address:data.addressEdit});
        showUpdateBox();
      
      await refetch();
    };

      const { mutate: updateTodo} = provideApolloClient(apolloClient)(() =>   useMutation(gql`
mutation MyQuery($id: uuid!,$phone: String!,$email: String!,$name:String!,$address:String!) {
  update_contacts_by_pk(pk_columns: {id: $id}, _set: {address: $address , email: $email, phone: $phone, name: $name}) {
    email
    name
    phone
    address
  }
}`))

const delate = async (data) => {
        console.log(data.id);
      await delateContact({id:data.id});

      await showDelateBox();
      await refetch();

    };
      const { mutate: delateContact} = provideApolloClient(apolloClient)(() =>   useMutation(gql`
mutation MyQuery ($id: uuid!){
  delete_contacts_by_pk(id: $id) {
    address
    created_at
    email
    id
  }
}`));
function showDelateBox() {
  isDelateVisible.value = true;
}
function showAddBox() {
  isAddSuccess.value = true;
}
function showUpdateBox() {
  isUpdateSuccess.value = true;
}
  </script>
  
