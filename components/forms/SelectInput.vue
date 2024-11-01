<script setup lang="ts">

    // Import Statements
    import { defineProps, defineEmits } from 'vue';

    // Define Props
    defineProps<{
        id: string;
        modelValue: string;
        options: { label: string; value: string }[];
    }>();

    // Define Emits
    defineEmits(['update:modelValue']);

</script>

<template>
    <select
        :id="id"
        class="form-select-input"
        :value="modelValue"
        @change="$emit('update:modelValue', $event.target.value)"
    >
        <option value="" disabled>Please Select...</option>
        <option v-for="option in options" :key="option.value" :value="option.value">
            {{ option.label }}
        </option>
    </select>
</template>

<style scoped lang="postcss">
    .form-select-input {
        @apply col-span-2 border-2 border-cyan-700 rounded-md px-2;
    }
</style>
