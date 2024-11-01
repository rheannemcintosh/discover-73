<script setup lang="ts">

    // Import Statements
    import { defineProps } from 'vue';

    // Define Props
    defineProps<{
        name: string;
    }>();

</script>

<template>
    <label
        :for="name"
        class="form-label"
    >
        <slot />
    </label>
</template>

<style scoped lang="postcss">
    .form-label {
        @apply font-semibold text-right text-cyan-800 pr-4;
    }
</style>
