<template>
    <div class="min-h-screen flex flex-col items-center mt-8">
      <div class="max-w-md w-full">
        <div class="flex border-b border-gray-200">
          <button
            class="py-4 px-6 text-lg text-black bg-gray-200 hover:bg-gray-300 ml-2 rounded"
            :class="activeTab === 'login' ? 'border-b-4 border-blue-500 text-bold' : ''"
            @click="activeTab = 'login'"
          >
            Login
          </button>
          <button
            class="py-4 px-6 text-lg bg-gray-200 hover:bg-gray-300 text-black ml-2 rounded"
            :class="activeTab === 'signup' ? 'border-b-4 border-blue-500 text-bold' : ''"
            @click="activeTab = 'signup'">
            Sign Up
          </button>
        </div>
        <div class="py-8">
          <div v-if="activeTab === 'login'">
            <h1 class="text-2xl mb-4">Login</h1>
            <form @submit.prevent="login">
              <div class="mb-4">
                <label class="block mb-2" for="email">Email</label>
                <input
                  class="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                  type="email"
                  id="email"
                  v-model="loginEmail"
                />
              </div>
              <div class="mb-4">
                <label class="block mb-2" for="password">Password</label>
                <input
                  class="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                  type="password"
                  id="password"
                  v-model="loginPassword"
                />
              </div>
              <button class="bg-blue-500 text-white py-2 px-4 rounded" @click="Login({email : loginEmail,password: loginPassword})" >Login</button>
            </form>
          </div>
          <div v-else-if="activeTab === 'signup'">
            <h1 class="text-2xl mb-4">Sign Up</h1>
            <form @submit.prevent="signup">
              <div class="mb-4">
                <label class="block mb-2" for="name">Name</label>
                <input
                  class="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                  type="text"
                  id="name"
                  v-model="signupName"
                />
              </div>
              <div class="mb-4">
                <label class="block mb-2" for="email">Email</label>
                <input
                  class="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                  type="email"
                  id="email"
                  v-model="signupEmail"
                />
              </div>
              <div class="mb-4">
                <label class="block mb-2" for="password">Password</label>
                <input
                  class="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                  type="password"
                  id="password"
                  v-model="signupPassword"
                />
              </div>
              <button class="bg-blue-500 text-white py-2 px-4 rounded" @click="create({name :signupName,email : signupEmail,password: signupPassword})">Sign Up</button>
            </form>
          </div>
        </div>
      </div>
      <div v-if="isInfoBoxVisible" class="fixed top-0 right-0 p-4 bg-green-500 text-white rounded-full" style="border-top-right-radius: 50px; border-bottom-right-radius: 50px;">
{{messagee}}
</div>
    </div>
  </template>
  
  <script setup>
  import { useQuery } from '@vue/apollo-composable'
  import gql from 'graphql-tag'
  import { provideApolloClient } from "@vue/apollo-composable";
  import apolloClient from '../../ApllloClient'
  import { useMutation } from '@vue/apollo-composable'
  import {ref, watch, onMounted } from 'vue'
  import { loginqueries,signupqueries,findId} from '../../query/query'
  import { useRouter} from "vue-router"
  import {inject} from "vue"
  import { useVuelidate } from '@vuelidate/core' 
  import { required, email, minLength } from 'vuelidate/lib/validators'

  const signout = inject('Member')
  const router = useRouter()

  provideApolloClient(apolloClient);

    const activeTab=ref('login') 
    const loginEmail=ref('')
    const loginPassword=ref('')
    const signupName=ref('')
    const signupEmail=ref('')
    const signupPassword=ref ('')
    const messagee=ref ('')
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
  const create = async (data) => {
    console.log(data)
try {
  const response = await apolloClient.mutate({
    mutation: signupqueries,
    variables: {
      name: data.name,
      email: data.email,
      password: data.password
    }
  });

  // handle successful response here
  console.log(response.data.Rigister.message);
  messagee.value=response.data.Rigister.message;
  showInfoBox();

} catch (error) {
  // handle error here
  console.error(error);
}
}
        const Login= async (data)=>{ 
          try {
            console.log(data)
            const result = await apolloClient.query({
                query: loginqueries,
                variables: {
                    email: data.email,
                    password: data.password,
                }
            })
            console.log(result.data.login.accessToken)
            console.log(result)

            window.localStorage.setItem("accessToken", result.data.login.accessToken);
            //console.log(window.localStorage.getItem("Apollotoken"))
            if (window.localStorage.getItem("accessToken")) {
              const responses = await apolloClient.query({
                query: findId,
                variables: {
                  email: data.email
                
                }
            })
            console.log(responses)
            router.push(`/home/${responses.data.users[0].user_id}`);
            signout();
                    // @click="router.push(`/userTodo/${users.id}`)
            }
        }
          catch (error) {
  // handle error here
  console.error(error);
}

}


  </script>
  






  <style>

.border-b-4 {
  border-bottom-width: 4px; /* or any other size you want */
}
  </style>
  
  