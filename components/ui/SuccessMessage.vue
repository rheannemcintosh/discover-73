<!-- components/SuccessMessage.vue -->
<template>
    <div v-if="message" class="bg-green-600 rounded-md px-4 py-1 text-white text-sm">
        <p>{{ message }}</p>
    </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';

const props = defineProps<{
    message: string | null;
}>();
</script>