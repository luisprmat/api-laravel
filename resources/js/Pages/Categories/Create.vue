<script setup>
import { ref } from 'vue';
import CardSection from '@/Components/CardSection.vue';
import InputLabel from '@/Components/InputLabel.vue';
import PrimaryButton from '@/Components/PrimaryButton.vue';
import TextInput from '@/Components/TextInput.vue'

const name = ref('')
const processing = ref(false)

const emit = defineEmits(['categoryCreated'])

const submit = () => {
    processing.value = true
    axios.post('/api/categories', {
        name: name.value
    })
        .then(response => {
            console.log('New Category ID: ' + response.data.data.id)
            name.value = ''
            processing.value = false
            emit('categoryCreated')
        })
        .finally(() => {
            processing.value = false
        })
}
</script>

<template>
    <CardSection class="pt-12" inner-classes="max-w-xl">
        <h2 class="text-lg font-medium">Nueva categoría</h2>

        <div>
            <form @submit.prevent="submit" class="mt-6 space-y-6">
                <div>
                    <InputLabel for="name" value="Nombre" />

                    <TextInput id="name" type="text" class="mt-1 block w-full" required v-model="name" />
                </div>

                <div>
                    <PrimaryButton :disabled="processing">Crear</PrimaryButton>
                </div>
            </form>
        </div>
    </CardSection>
</template>
