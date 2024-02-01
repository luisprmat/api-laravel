<script setup>
import { computed } from 'vue';

const props = defineProps({
    type: {
        type: String,
        default: 'button',
    },
    bgColor: {
        type: String,
        default: 'gray'
    }
});

const classes = computed(() => {
    switch (props.bgColor) {
        case 'gray':
            return 'inline-flex items-center p-2 bg-gray-800 dark:bg-gray-200 border border-transparent rounded-md font-semibold text-xs text-white dark:text-gray-800 hover:bg-gray-700 dark:hover:bg-white focus:bg-gray-700 dark:focus:bg-white active:bg-gray-900 dark:active:bg-gray-300 focus:outline-none ring-2 focus:ring-slate-500 ring-offset-2 dark:focus:ring-offset-gray-800 disabled:opacity-50 disabled:hover:bg-gray-800 transition ease-in-out duration-150'
        case 'danger':
            return 'inline-flex items-center p-2 bg-red-800 dark:bg-red-200 border border-transparent rounded-md font-semibold text-xs text-white dark:text-red-800 hover:bg-red-700 dark:hover:bg-white focus:bg-red-700 dark:focus:bg-white active:bg-red-900 dark:active:bg-red-300 focus:outline-none ring-2 focus:ring-slate-500 ring-offset-2 dark:focus:ring-offset-red-800 disabled:opacity-50 disabled:hover:bg-red-800 transition ease-in-out duration-150'
    }
})
</script>
<template>
    <button :class="classes" :type="type">
        <slot />
    </button>
</template>
