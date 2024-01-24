<script setup>
import { onMounted, ref } from 'vue';
import MainLayout from '@/Layouts/MainLayout.vue';

const categories = ref({})

const getCategories = async () => {
    await axios.get('/api/categories')
        .then(response => {
            categories.value = response.data
        })
        .catch((error) => console.log(error))
}

onMounted(() => {
    getCategories()
})
</script>

<template>
    <MainLayout>
        <template #header>
            <h2 class="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Categorías</h2>
        </template>

        <div class="py-12">
            <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div class="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                    <div class="p-6 text-gray-900 dark:text-gray-100">
                        <div>
                            <pre>{{ categories }}</pre>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </MainLayout>
</template>

