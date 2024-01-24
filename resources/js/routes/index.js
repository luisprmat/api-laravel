import { createRouter, createWebHistory } from 'vue-router';

import ProductsIndex from '@/Pages/Products/Index.vue';

const routes = [
    {
        path: '/',
        redirect: { name: 'products.index' },
    },
    {
        path: '/products',
        name: 'products.index',
        component: ProductsIndex,
    },
    {
        path: '/categories',
        name: 'categories.index',
        component: () => import('@/Pages/Categories/index.vue'),
    }
]

export default createRouter({
    history: createWebHistory(),
    routes,
})
