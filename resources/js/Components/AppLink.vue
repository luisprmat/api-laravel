<script setup>
import { RouterLink } from 'vue-router'

const props = defineProps({
    activeClasses: {
        type: String
    },
    inactiveClasses: {
        type: String
    }
})
</script>

<template>
    <RouterLink v-bind="$props" custom v-slot="{ isActive, href, navigate }">
        <a v-bind="$attrs" :href="href" @click="navigate" :class="isActive ? activeClasses : inactiveClasses">
            <slot />
        </a>
    </RouterLink>
</template>
