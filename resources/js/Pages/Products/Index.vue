<script setup>
import { onMounted, ref } from 'vue';
import { TailwindPagination } from 'laravel-vue-pagination';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';

const products = ref({})

const getProducts = async (page = 1) => {
    await axios.get(`/api/products?page=${page}`)
        .then(response => {
            products.value = response.data
        })
        .catch((error) => console.log(error))
}

onMounted(getProducts)
</script>

<template>
    <AuthenticatedLayout>
        <template #header>
            <h2 class="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Productos</h2>
        </template>

        <div class="py-12">
            <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div class="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                    <div class="p-6 text-gray-900 dark:text-gray-100">
                        <div>
                            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                                <div class="space-y-2" v-for="product in products.data" :key="product.id">
                                    <a href="#">
                                        <img src="http://placehold.it/300x400" :alt="product.name" />
                                    </a>
                                    <a class="text-slate-500 text-xl font-semibold hover:underline">
                                        {{ product.name }}
                                    </a>
                                    <p>$ {{ product.price }}</p>
                                    <p class="italic text-indigo-700"><span class="font-semibold">Categoría: </span>{{
                                        product.category.name }}</p>
                                    <p class="prose-slate">{{ product.description }}</p>
                                </div>
                            </div>

                            <div class="mt-4 flex flex-col md:flex-row md:justify-between">
                                <div class="order-last md:order-first mt-2">
                                    <div>
                                        <p class="text-sm text-gray-700 leading-5 dark:text-gray-200">
                                            <span>Mostrando </span>
                                            <span class="font-medium">{{ products.meta?.from }}</span>
                                            <span> al </span>
                                            <span class="font-medium">{{ products.meta?.to }}</span>
                                            <span> de </span>
                                            <span class="font-medium">{{ products.meta?.total }}</span>
                                            <span> resultados</span>
                                        </p>
                                    </div>
                                </div>
                                <div>
                                    <TailwindPagination :data="products" @pagination-change-page="getProducts" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </AuthenticatedLayout>
</template>
