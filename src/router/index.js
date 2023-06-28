import { createWebHistory, createRouter } from "vue-router";
import userTodo from '../components/HomePage/usersTodo.vue'
import login from '../components/HomePage/login.vue'
import home from '../components/HomePage/home.vue'
const routes = [
    {
        path: '/',
        component: login,
    } ,
    
    {
        path: '/home/:id',
        component: home, 
        meta: { requiresAuth: true } 
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
 router.beforeEach((to, from, next) => {
    const isAuthenticated = localStorage.getItem('accessToken');
    if (to.matched.some(record => record.meta.requiresAuth) && !isAuthenticated) {
      next('/');
    } else {
      next();
    }
  });
 export default router;