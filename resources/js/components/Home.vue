<script setup>
import { onMounted, ref } from 'vue';
import { TailwindPagination } from 'laravel-vue-pagination';
import MainLayout from '@/Layouts/MainLayout.vue';

const categories = ref({})
const products = ref({})

const getCategories = async () => {
    await axios.get('/api/categories')
        .then(response => {
            categories.value = response.data
        })
        .catch((error) => console.log(error))
}

const getProducts = async (page = 1) => {
    await axios.get(`/api/products?page=${page}`)
        .then(response => {
            products.value = response.data
        })
        .catch((error) => console.log(error))
}

onMounted(() => {
    getCategories()
    getProducts()
})
</script>

<template>
    <MainLayout>
        <template #header>
            <h2 class="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Productos</h2>
        </template>

        <div class="py-12">
            <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div class="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                    <div class="p-6 text-gray-900 dark:text-gray-100">
                        <div>
                            <div class="grid grid-cols-3 gap-4">
                                <div class="space-y-2" v-for="product in products.data" :key="product.id">
                                    <a href="#">
                                        <img src="http://placehold.it/300x400" :alt="product.name" />
                                    </a>
                                    <a class="text-slate-500 text-xl font-semibold hover:underline">
                                        {{ product.name }}
                                    </a>
                                    <p>${{ product.price }}</p>
                                    <p class="prose-slate">{{ product.description }}</p>
                                </div>
                            </div>

                            <TailwindPagination :data="products" @pagination-change-page="getProducts" class="mt-4" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </MainLayout>
</template>
