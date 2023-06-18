import { createWebHistory, createRouter } from "vue-router";
import userTodo from '../components/HomePage/usersTodo.vue'
import users from '../components/HomePage/Users.vue'

const routes = [
    {
        path: '/',
        component: users,
    },


    {
        path: '/userTodo/:id',
        component: userTodo

    },
    { 
      path: '/:pathMatch(.*)*',
      name: 'NotFound', 
      component: () => import('../components/HomePage/NotFoundView.vue')
    },

];
 const router = createRouter({
    history: createWebHistory(),
    routes,
 });
 export default router;