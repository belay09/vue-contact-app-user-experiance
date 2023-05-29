import { createWebHistory, createRouter } from "vue-router";
import Home from "../components/Home.vue"
import Description from "../components/Description.vue"
import Apol from '../components/HomePage/Apol.vue'
const routes = [
    {
        path: '/', component: Apol,
    },
    {
        path: "/Description", component: Description,
    }
];
 const router = createRouter({
    history: createWebHistory(),
    routes,
 });
 export default router;