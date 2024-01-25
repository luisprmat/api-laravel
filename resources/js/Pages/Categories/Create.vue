<script setup>
import { useForm } from 'laravel-precognition-vue';
import CardSection from '@/Components/CardSection.vue';
import InputError from '@/Components/InputError.vue';
import InputLabel from '@/Components/InputLabel.vue';
import PrimaryButton from '@/Components/PrimaryButton.vue';
import TextInput from '@/Components/TextInput.vue'

const form = useForm('post', '/api/categories', {
    name: '',
})

const emit = defineEmits(['categoryCreated'])

const submit = () => form.submit()
    .then(response => {
        form.reset()
        emit('categoryCreated')
        console.log('Nueva categoría (ID): ' + response.data.data.id)
    })
</script>

<template>
    <CardSection class="pt-12" inner-classes="max-w-xl">
        <h2 class="text-lg font-medium">Nueva categoría</h2>

        <div>
            <form @submit.prevent="submit" class="mt-6 space-y-6">
                <div>
                    <InputLabel for="name" value="Nombre" />

                    <TextInput id="name" type="text" class="mt-1 block w-full" v-model="form.name"
                        @keyup="form.validate('name')" />

                    <InputError class="mt-2" v-if="form.invalid('name')" :message="form.errors.name" />
                </div>

                <div>
                    <PrimaryButton :disabled="form.processing">Crear</PrimaryButton>
                </div>
            </form>
        </div>
    </CardSection>
</template>
