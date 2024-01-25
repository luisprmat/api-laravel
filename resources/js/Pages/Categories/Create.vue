<script setup>
import { ref } from 'vue';
import CardSection from '@/Components/CardSection.vue';
import InputError from '@/Components/InputError.vue';
import InputLabel from '@/Components/InputLabel.vue';
import PrimaryButton from '@/Components/PrimaryButton.vue';
import TextInput from '@/Components/TextInput.vue'

const name = ref('')
const processing = ref(false)
const validationErrors = ref('')

const emit = defineEmits(['categoryCreated'])

const submit = () => {
    processing.value = true
    validationErrors.value = ''

    axios.post('/api/categories', {
        name: name.value
    })
        .then(response => {
            console.log('New Category ID: ' + response.data.data.id)
            name.value = ''
            validationErrors.value = ''
            emit('categoryCreated')
        })
        .catch(function (error) {
            if (error.response.status === 422) {
                validationErrors.value = error.response.data.errors.name[0]
            }
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

                    <TextInput id="name" type="text" class="mt-1 block w-full" v-model="name" />

                    <InputError class="mt-2" :message="validationErrors" />
                </div>

                <div>
                    <PrimaryButton :disabled="processing">Crear</PrimaryButton>
                </div>
            </form>
        </div>
    </CardSection>
</template>
