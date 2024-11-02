<script setup lang="ts">

    // Import Statements
    import { defineProps, defineEmits } from 'vue';

    // Define Props
    defineProps<{
        id: string;
        modelValue: number;
    }>();

    // Define Emits
    defineEmits(['update:modelValue']);

</script>

<template>
    <input
        :id="id"
        type="number"
        class="form-number-input"
        :value="modelValue"
        @input="$emit('update:modelValue', Number($event.target.value))"
    />
</template>

<style scoped lang="postcss">
    .form-number-input {
        @apply col-span-2 border-2 border-cyan-700 rounded-md px-2;
    }
</style>
