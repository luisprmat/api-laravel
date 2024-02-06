<script setup>
import Checkbox from '@/Components/Checkbox.vue';
import GuestLayout from '@/Layouts/GuestLayout.vue';
import InputError from '@/Components/InputError.vue';
import InputLabel from '@/Components/InputLabel.vue';
import PrimaryButton from '@/Components/PrimaryButton.vue';
import TextInput from '@/Components/TextInput.vue';
import { useAuth } from '@/stores/auth';

const auth = useAuth()

defineProps({
    status: {
        type: String,
    },
});

</script>

<template>
    <GuestLayout>
        <div v-if="status" class="mb-4 font-medium text-sm text-green-600">
            {{ status }}
        </div>

        <form @submit.prevent="auth.login">
            <div>
                <InputLabel for="email" value="Correo electrónico" />

                <TextInput id="email" type="email" class="mt-1 block w-full" v-model="auth.form.email" required autofocus
                    autocomplete="username" />

                <InputError v-if="auth.errors.email" class="mt-2" :message="auth.errors.email[0]" />
            </div>

            <div class="mt-4">
                <InputLabel for="password" value="Contraseña" />

                <TextInput id="password" type="password" class="mt-1 block w-full" v-model="auth.form.password" required
                    autocomplete="current-password" />

                <InputError v-if="auth.errors.password" class="mt-2" :message="auth.errors.password[0]" />
            </div>

            <div class="block mt-4">
                <label class="flex items-center">
                    <Checkbox name="remember" v-model:checked="auth.form.remember" />
                    <span class="ms-2 text-sm text-gray-600 dark:text-gray-400">Recordar mi sesión</span>
                </label>
            </div>

            <div class="flex items-center justify-end mt-4">
                <PrimaryButton class="ms-4" :class="{ 'opacity-25': auth.loading }" :disabled="auth.loading">
                    {{ auth.loading ? 'Enviando' : 'Iniciar sesión' }}
                </PrimaryButton>
            </div>
        </form>
    </GuestLayout>
</template>
