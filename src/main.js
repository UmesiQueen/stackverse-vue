import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router';
import './style.css'
import App from './App.vue'
import Home from './routes/Home.vue';
import ShoppingCart from './routes/ShoppingCart.vue';

const routes = [
    { path: '/', component: Home },
    { path: '/cart', component: ShoppingCart }
];

const router = createRouter({
    history: createWebHashHistory('/stackverse-vue/'),
    routes,
});

createApp(App).use(router).mount('#app')
