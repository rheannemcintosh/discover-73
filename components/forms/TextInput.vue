<script setup lang="ts">

    // Import Statements
    import { defineProps, defineEmits } from 'vue';

    // Define Props
    defineProps<{
        id: string;
        modelValue: string;
    }>();

    // Define Emits
    defineEmits(['update:modelValue']);

</script>

<template>
    <input
        :id="id"
        type="text"
        class="form-text-input"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
    />
</template>

<style scoped lang="postcss">
    .form-text-input {
        @apply col-span-2 border-2 border-cyan-700 rounded-md px-2;
    }
</style>
