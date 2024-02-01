<script setup>
import { useCategories } from '@/stores/categories';
import CardSection from '@/Components/CardSection.vue';
import InputError from '@/Components/InputError.vue';
import InputLabel from '@/Components/InputLabel.vue';
import PrimaryButton from '@/Components/PrimaryButton.vue';
import SelectImage from '@/Components/SelectImage.vue';
import TextInput from '@/Components/TextInput.vue'

const store = useCategories()
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

            <SelectImage class="sm:row-span-2 sm:flex sm:justify-end" />

            <div>
                <PrimaryButton :disabled="store.loading">{{ store.loading ? 'Guardando' : 'Crear' }}
                </PrimaryButton>
            </div>
        </form>
    </CardSection>
</template>
