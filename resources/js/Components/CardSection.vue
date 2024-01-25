<script setup>
import { computed } from 'vue';

const props = defineProps({
    withoutPadding: {
        type: Boolean,
    },
    innerClasses: {
        type: String,
    }
})

const classes = computed(() =>
    props.withoutPadding
        ? 'text-gray-900 dark:text-gray-100'
        : 'p-6 text-gray-900 dark:text-gray-100'
)
</script>

<template>
    <div>
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
            <div class="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                <div :class="[classes, innerClasses]">
                    <slot />
                </div>
            </div>
        </div>
    </div>
</template>
