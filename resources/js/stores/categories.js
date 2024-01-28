import { defineStore } from 'pinia';
import { ref, reactive } from 'vue';

export const useCategories = defineStore('categories', () => {
    const categories = ref({})
    const category = reactive({
        id: '',
        name: ''
    })
    const errors = ref('')
    const loading = ref(false)
    const form = reactive({
        name: ''
    })
    const editForm = reactive({
        name: ''
    })

    const resetForm = () => {
        form.name = ''
        errors.value = ''
    }

    const resetEditForm = () => {
        editForm.name = ''
        errors.value = ''
    }

    const cancelEdition = () => {
        resetEditForm()
        category.id = '',
        category.name = ''
    }

    const getCategories = async () => {
        await axios.get('/api/categories')
            .then(response => {
                categories.value = response.data
            })
            .catch((error) => console.log(error))
    }

    const getCategory = async (id) => {
        await axios.get(`/api/categories/${id}`)
            .then(response => {
                category.value = response.data
            })
            .catch((error) => console.log(error))
    }

    const storeCategory = async () => {
        if (loading.value) return

        loading.value = true
        errors.value = ''

        axios.post('/api/categories', form)
            .then(response => {
                console.log('NEW Category ID: ' + response.data.data.id)
                getCategories()
                resetForm()
            })
            .catch(error => {
                if (error.response.status === 422) {
                    errors.value = error.response.data.errors.name[0]
                }
            })
            .finally(() => (loading.value = false))
    }

    const editCategory = async (cat) => {
        resetEditForm()
        category.id = cat.id
        category.name = cat.name
        editForm.name = category.name
    }

    const updateCategory = async (id) => {
        if (loading.value) return

        loading.value = true
        errors.value = ''

        axios.put(`/api/categories/${id}`, editForm)
            .then(response => {
                console.log('Category Updated ID: ' + response.data.data.id)
                getCategories()
                cancelEdition()
            })
            .catch(error => {
                if (error.response.status === 422) {
                    errors.value = error.response.data.errors.name[0]
                }
            })
            .finally(() => (loading.value = false))
    }

    return {
        categories,
        category,
        errors,
        loading,
        form,
        editForm,
        resetForm,
        resetEditForm,
        cancelEdition,
        getCategories,
        getCategory,
        storeCategory,
        editCategory,
        updateCategory
    }
})
