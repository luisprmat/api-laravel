<script setup>
import { ref } from 'vue';
import { useCategories } from '@/stores/categories';
import IconButton from '@/Components/IconButton.vue';

const focused = ref(false)
const store = useCategories()

const inputFile = ref(null)

const clearInputFile = (ctrl) => {
    try {
        ctrl.value = null
    } catch (error) {
        if (ctrl?.value) ctrl.parentNode.replaceChild(ctrl.cloneNode(true), ctrl)
    }
}

const handleFileUpload = (payload) => {
    let file = payload
    const reader = new FileReader()

    // Validation from client
    const imageMimetypes = [
        'image/webp',
        'image/tiff',
        'image/svg+xml',
        'image/png',
        'image/apng',
        'image/vnd.microsoft.icon',
        'image/gif',
        'image/bmp',
        'image/jpeg',
    ]

    if (!imageMimetypes.includes(file.type)) {
        file = null
        clearImage()
        alert('Tipo de archivo no permitido')

        return
    }

    reader.onload = () => {
        store.form.previewImage = reader.result
    }

    reader.readAsDataURL(file)

    store.form.photo = payload
}

const clearImage = () => {
    store.form.previewImage = null
    store.form.photo = null
    clearInputFile(inputFile.value)
}
</script>

<template>
    <div>
        <div v-if="store.form.previewImage" class="h-40 w-40 sm:h-56 sm:w-56 relative overflow-hidden">
            <IconButton @click="clearImage" class="absolute bottom-2 right-2" bg-color="danger">
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
            <input ref="inputFile" id="photo" class="sr-only" type="file" @change="handleFileUpload($event.target.files[0])"
                accept="image/*" @focus="focused = true" @blur="focused = false" />
        </div>
    </div>
</template>
