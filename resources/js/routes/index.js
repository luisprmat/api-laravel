import { createRouter, createWebHistory } from 'vue-router';

import ProductsIndex from '@/Pages/Products/Index.vue';
import Login from '@/Pages/Auth/Login.vue';

const auth = () => {
    if (localStorage.getItem('user') === 'false' ) return { name: 'login' }
}

const guest = () => {
    if (localStorage.getItem('user') === 'true')
        return { name: 'products.index' }
}

const routes = [
    {
        path: '/',
        redirect: { name: 'products.index' },
    },
    {
        path: '/signin',
        name: 'login',
        beforeEnter: guest,
        component: Login,
    },
    {
        path: '/products',
        name: 'products.index',
        beforeEnter: auth,
        component: ProductsIndex,
    },
    {
        path: '/categories',
        name: 'categories.index',
        beforeEnter: auth,
        component: () => import('@/Pages/Categories/index.vue'),
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'not-found',
        component: () => import('@/Pages/Errors/NotFound.vue'),
    }
]

export default createRouter({
    history: createWebHistory(),
    routes,
})
