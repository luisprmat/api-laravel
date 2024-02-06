<script setup>
import { computed } from 'vue';
import AppLink from '@/Components/AppLink.vue'

const props = defineProps({
    type: {
        type: String,
        default: 'link',
    },
    href: {
        type: String,
    },
    active: {
        type: Boolean
    }
})

const activeClasses = computed(() => 'block w-full pl-3 pr-4 py-2 border-l-4 border-indigo-400 text-left text-base font-medium text-indigo-700 bg-indigo-50 focus:outline-none focus:text-indigo-800 focus:bg-indigo-100 focus:border-indigo-700 transition duration-150 ease-in-out')
const inactiveClasses = computed(() => 'block w-full pl-3 pr-4 py-2 border-l-4 border-transparent text-left text-base font-medium text-gray-600 hover:text-gray-800 hover:bg-gray-50 hover:border-gray-300 focus:outline-none focus:text-gray-800 focus:bg-gray-50 focus:border-gray-300 transition duration-150 ease-in-out')
</script>

<template>
    <AppLink v-if="props.type === 'link'" v-bind="$attrs" :active-classes="activeClasses"
        :inactive-classes="inactiveClasses">
        <slot />
    </AppLink>

    <button v-else :class="inactiveClasses">
        <slot />
    </button>
</template>
