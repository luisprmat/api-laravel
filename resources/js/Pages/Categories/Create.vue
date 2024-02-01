<script setup>
import { ref } from 'vue';
import { useCategories } from '@/stores/categories';
import CardSection from '@/Components/CardSection.vue';
import IconButton from '@/Components/IconButton.vue';
import InputError from '@/Components/InputError.vue';
import InputLabel from '@/Components/InputLabel.vue';
import PrimaryButton from '@/Components/PrimaryButton.vue';
import TextInput from '@/Components/TextInput.vue'

const focused = ref(false)

const store = useCategories()

const handleFileUpload = (payload) => {
    const file = payload
    const reader = new FileReader()

    reader.onload = () => {
        store.form.previewImage = reader.result
    }

    reader.readAsDataURL(file)

    store.form.photo = payload
}
</script>

<template>
    <CardSection class="pt-12">
        <form @submit.prevent="store.storeCategory"
            class="grid grid-cols-1 gap-6 justify-between sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            <div class="sm:col-span-1 md:col-span-2 lg:col-span-3 lg:w-4/5">
                <h2 class="text-lg font-medium">Nueva categoría</h2>
                <div class="mt-6 space-y-6">
                    <InputLabel for="name" value="Nombre" />

                    <TextInput id="name" type="text" class="mt-1 block w-full" v-model="store.form.name" />

                    <InputError class="mt-2" :message="store.errors" />
                </div>
            </div>
            <div class="sm:row-span-2 sm:flex sm:justify-end">
                <div v-if="store.form.previewImage" class="h-40 w-40 sm:h-56 sm:w-56 relative overflow-hidden">
                    <IconButton @click="store.form.previewImage = null" class="absolute bottom-2 right-2" bg-color="danger">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                            stroke="currentColor" class="w-5 h-5">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                        </svg>
                    </IconButton>
                    <img class="object-contain object-center" :src="store.form.previewImage" alt="Preview">
                </div>
                <div v-else
                    class="h-40 w-40 sm:h-56 sm:w-56 bg-slate-50 border-2 border-dashed rounded flex items-center justify-center">
                    <label for="photo"
                        class="cursor-pointer text-slate-700 italic hover:font-semibold hover:text-indigo-500"
                        :class="{ 'font-bold text-indigo-500 underline': focused }">Cargar
                        imagen</label>
                    <input id="photo" class="sr-only" type="file" @change="handleFileUpload($event.target.files[0])"
                        @focus="focused = true" @blur="focused = false" />
                </div>
            </div>
            <div>
                <PrimaryButton :disabled="store.loading">{{ store.loading ? 'Guardando' : 'Crear' }}
                </PrimaryButton>
            </div>
        </form>
    </CardSection>
</template>
