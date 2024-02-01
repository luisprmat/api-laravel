<script setup>
import { ref } from 'vue';
import { useCategories } from '@/stores/categories';
import IconButton from '@/Components/IconButton.vue';

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
    <div>
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
            <label for="photo" class="cursor-pointer text-slate-700 italic hover:font-semibold hover:text-indigo-500"
                :class="{ 'font-bold text-indigo-500 underline': focused }">Cargar
                imagen</label>
            <input id="photo" class="sr-only" type="file" @change="handleFileUpload($event.target.files[0])"
                @focus="focused = true" @blur="focused = false" />
        </div>
    </div>
</template>
