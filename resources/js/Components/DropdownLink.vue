<script setup>
import { computed } from 'vue';

const props = defineProps({
    type: {
        type: String,
        default: 'link'
    },
    href: {
        type: String,
    },
});

const classes = computed(() => 'block w-full px-4 py-2 text-start text-sm leading-5 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:bg-gray-100 dark:focus:bg-gray-800 transition duration-150 ease-in-out')
</script>

<template>
    <a v-if="props.type === 'link'" :href="href" :class="classes">
        <slot />
    </a>
    <button v-else :class="classes">
        <slot />
    </button>
</template>
