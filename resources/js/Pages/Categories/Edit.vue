<script setup>
import { computed } from 'vue';
import { useCategories } from '@/stores/categories';
import CardSection from '@/Components/CardSection.vue';
import InputError from '@/Components/InputError.vue';
import InputLabel from '@/Components/InputLabel.vue';
import PrimaryButton from '@/Components/PrimaryButton.vue';
import SelectImage from '@/Components/SelectImage.vue';
import SecondaryButton from '@/Components/SecondaryButton.vue';
import TextInput from '@/Components/TextInput.vue'

const store = useCategories()

const validationErrors = computed(() => {
    const errs = []

    for (const key in store.errors) {
        errs.push(store.errors[key][0])
    }

    return errs
})
</script>

<template>
    <CardSection class="pt-12">
        <form @submit.prevent="store.updateCategory(store.category.id)"
            class="grid grid-cols-1 gap-6 justify-between sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            <div class="sm:col-span-1 md:col-span-2 lg:col-span-3 lg:w-4/5">
                <h2 class="text-lg font-medium">Actualizar categoría: {{ store.category.id }}</h2>
                <div class="mt-6">
                    <InputLabel for="name" value="Nombre" />

                    <TextInput id="name" type="text" class="mt-1 block w-full" v-model="store.form.name" />

                    <InputError class="mt-2" :message="validationErrors[0]" />
                </div>
            </div>

            <SelectImage class="sm:row-span-2 sm:flex sm:justify-end" />

            <div class="space-x-4 sm:col-span-1 md:col-span-2 lg:col-span-3 lg:w-4/5">
                <PrimaryButton :disabled="store.loading">{{ store.loading ? 'Guardando' : 'Actualizar' }}
                </PrimaryButton>
                <SecondaryButton @click="store.cancelEdition">Cancelar</SecondaryButton>
            </div>
        </form>
    </CardSection>
</template>
