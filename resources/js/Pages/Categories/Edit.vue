<script setup>
import { useCategories } from '@/stores/categories';
import CardSection from '@/Components/CardSection.vue';
import InputError from '@/Components/InputError.vue';
import InputLabel from '@/Components/InputLabel.vue';
import PrimaryButton from '@/Components/PrimaryButton.vue';
import SecondaryButton from '@/Components/SecondaryButton.vue';
import TextInput from '@/Components/TextInput.vue'

const store = useCategories()
</script>

<template>
    <CardSection class="pt-12" inner-classes="max-w-xl">
        <h2 class="text-lg font-medium">Actualizar categoría: {{ store.category.id }}</h2>

        <div>
            <form @submit.prevent="store.updateCategory(store.category.id)" class="mt-6 space-y-6">
                <div>
                    <InputLabel for="name" value="Nombre" />

                    <TextInput id="name" type="text" class="mt-1 block w-full" v-model="store.editForm.name" />

                    <InputError class="mt-2" :message="store.errors" />
                </div>

                <div>
                    <PrimaryButton :disabled="store.loading">{{ store.loading ? 'Guardando' : 'Actualizar' }}
                    </PrimaryButton>
                    <SecondaryButton class="ml-4" @click="store.cancelEdition">Cancelar</SecondaryButton>
                </div>
            </form>
        </div>
    </CardSection>
</template>
