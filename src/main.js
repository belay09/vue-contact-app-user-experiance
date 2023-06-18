import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router/index.js'

import { DefaultApolloClient } from '@vue/apollo-composable'
import apolloClient from './ApllloClient'

createApp(App)
.provide(DefaultApolloClient,apolloClient)
.use(router)
.mount('#app')
