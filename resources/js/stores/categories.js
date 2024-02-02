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
        name: '',
        photo: null,
        previewImage: null,
    })

    let serializedCategory = reactive({})

    const editForm = reactive({
        name: ''
    })

    const resetForm = () => {
        form.name = ''
        form.photo = null
        form.previewImage = null
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

        serializedCategory = { ...form }

        if(form.photo) {
            serializedCategory = new FormData()

            for (let item in form) {
                if (form.hasOwnProperty(item)) {
                    if(!form[item]) continue
                    serializedCategory.append(item, form[item])
                }
            }
        } else {
            delete serializedCategory.photo
            delete serializedCategory.previewImage
        }

        axios.post('/api/categories', serializedCategory)
            .then(response => {
                console.log('NEW Category ID: ' + response.data.data.id)
                resetForm()
                getCategories()
            })
            .catch(error => {
                if (error.response.status === 422) {
                    form.photo = null
                    form.previewImage = null
                    errors.value = error.response.data.errors
                }
            })
            .finally(() => {
                loading.value = false
                serializedCategory = undefined
            })
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
                    errors.value = error.response.data.errors
                }
            })
            .finally(() => (loading.value = false))
    }

    const deleteCategory = async (id) => {
        if(!window.confirm(`¿Está seguro de eliminar la categoría #${id}?`)) return

        axios.delete(`/api/categories/${id}`)
            .then(getCategories)
            .catch(error => {
                alert(error.response.data.message)
            })
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
        updateCategory,
        deleteCategory
    }
})
