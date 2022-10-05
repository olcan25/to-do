import { createRouter, createWebHistory } from 'vue-router';
import Todo from '../views/Todo.vue'



const routes = [
    { path: '/', component: Todo },
];


const router = createRouter({
    history: createWebHistory(),
    routes
})


export default router;