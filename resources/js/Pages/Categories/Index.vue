<script setup>
import { onMounted } from 'vue';
import { useCategories } from '@/stores/categories';
import CardSection from '@/Components/CardSection.vue';
import MainLayout from '@/Layouts/MainLayout.vue';
import CreateForm from '@/Pages/Categories/Create.vue';
import EditForm from '@/Pages/Categories/Edit.vue';

const store = useCategories()

onMounted(store.getCategories)
</script>

<template>
    <MainLayout>
        <template #header>
            <h2 class="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Categorías</h2>
        </template>

        <EditForm v-if="store.category?.id" />
        <CreateForm v-else />

        <CardSection class="pt-6 pb-12" without-padding>
            <div>
                <!-- Table -->
                <div class="flex flex-col">
                    <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                            <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                                <table class="min-w-full divide-y divide-gray-200">
                                    <thead>
                                        <tr>
                                            <th
                                                class="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                                                ID
                                            </th>
                                            <th></th>
                                            <th
                                                class="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                                                Nombre
                                            </th>
                                            <th
                                                class="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                                                Productos
                                            </th>
                                            <th
                                                class="px-6 py-3 bg-gray-50 text-right text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                                                Acciones
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody class="bg-white divide-y divide-gray-200">
                                        <template v-if="!store.categories">
                                            <tr>Cargando ....</tr>
                                        </template>
                                        <template v-else>
                                            <tr v-for="category in store.categories.data" :key="category.id">
                                                <td class="px-6 py-4 whitespace-nowrap">
                                                    <div class="text-sm leading-5 text-gray-900">
                                                        {{ category.id }}
                                                    </div>
                                                </td>
                                                <td class="px-6 py-4 whitespace-nowrap">
                                                    <div v-if="category.photo_url" class="flex-shrink-0 h-16 w-16">
                                                        <img class="h-16 w-16 rounded-lg" :src="category.photo_url"
                                                            :alt="category.name">
                                                    </div>
                                                </td>
                                                <td class="px-6 py-4 whitespace-nowrap">
                                                    <div class="text-sm leading-5 text-gray-900">
                                                        {{ category.name }}
                                                    </div>
                                                </td>
                                                <td class="px-6 py-4 whitespace-nowrap">
                                                    <div class="text-sm leading-5 text-gray-900">
                                                        {{ category.products }}
                                                    </div>
                                                </td>
                                                <td
                                                    class="px-6 py-4 whitespace-nowrap text-right text-sm leading-5 font-medium">
                                                    <button class="text-gray-900" @click="store.editCategory(category)">
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none"
                                                            viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
                                                            class="w-5 h-5">
                                                            <path stroke-linecap="round" stroke-linejoin="round"
                                                                d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                                                        </svg>
                                                    </button>
                                                    <button class="ml-4 text-red-500 disabled:opacity-50"
                                                        :disabled="category.products > 0"
                                                        @click="store.deleteCategory(category.id)">
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none"
                                                            viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
                                                            class="w-5 h-5">
                                                            <path stroke-linecap="round" stroke-linejoin="round"
                                                                d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                                        </svg>
                                                    </button>
                                                </td>
                                            </tr>
                                        </template>

                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- End of table -->
            </div>
        </CardSection>
    </MainLayout>
</template>

