import { defineStore } from 'pinia';
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useStorage } from '@vueuse/core';
import axios from 'axios';

export const useAuth = defineStore('auth', () => {
    const user = useStorage('user', false)
    const userInfo = ref({})

    const loading = ref(false)
    const errors = ref({})

    const router = useRouter()

    const form = reactive({
        email: '',
        password: '',
        remember: false,
    })

    const resetForm = () => {
        form.email = '',
        form.password = ''
    }

    const login = async () => {
        if (loading.value) return

        loading.value = true
        errors.value = {}
        try {
            await axios.get('/sanctum/csrf-cookie')
            await axios.post('/login', form)

            form.password = ''
            user.value = true
            errors.value = {}
            getUser()
            router.push({ name: 'products.index' })
        } catch (error) {
            if (error.response.status === 422) {
                errors.value = error.response.data.errors
                form.password = ''
            } else {
                user.value = false
            }
        }
        loading.value = false
    }

    const logout = async () => {
        try {
            await axios.post('/logout')
            user.value = false
            errors.value = {}
            resetForm()
            router.push({ name: 'login' })

        } catch (error) {
            console.log(error)
        }
    }

    const getUser = async () => {
        try {
            const response = await axios.get('/api/user')
            userInfo.value = response.data.data
        } catch (error) {
            console.log(error)
        }
    }

    return {
        user,
        userInfo,
        form,
        resetForm,
        loading,
        errors,
        login,
        logout,
        getUser,
    }
})
