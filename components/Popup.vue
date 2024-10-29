<template>
    <Transition>
        <div v-if="isVisible" class="popup-overlay" @click.self="close">
            <div class="popup-container">
                <div v-if="isVisible" class="popup-overlay" @click.self="close">
                    <div class="popup-container relative">
                        <button
                            @click="close"
                            class="absolute top-3 right-3 text-cyan-700 hover:text-cyan-900 focus:outline-none"
                        >
                            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                            </svg>
                        </button>
                        <div class="popup-header">
                            <h3>{{ title }}</h3>
                        </div>
                        <div class="popup-body">
                            <slot />
                        </div>
                        <div class="popup-buttons">
                            <button
                                class="secondary-button"
                                @click="close"
                            >
                                Close
                            </button>
                            <button class="primary-button">
                                Submit
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </Transition>
</template>

<script lang="ts" setup>
    import { defineProps, defineEmits, ref } from 'vue';

    const props = defineProps<{
        title: string;
        isVisible: boolean;
    }>();

    const emit = defineEmits<{
        (e: 'close'): void;
    }>();

    const close = () => {
        emit('close');
    };
</script>

<style scoped lang="postcss">
    .v-enter-active, .v-leave-active {
        @apply transition-opacity duration-1000;
    }

    .v-enter-from, .v-leave-to {
        @apply opacity-0;
    }

    .v-enter-to {
        @apply opacity-100;
    }

    .popup-overlay {
        @apply bg-black/20 fixed inset-0 flex items-center justify-center z-50 backdrop-blur-sm;
    }

    .popup-container {
        @apply bg-gray-50 rounded-lg w-11/12 max-w-xl p-8 shadow-lg shadow-gray-600;
    }

    .popup-header {
        @apply flex justify-center items-center text-2xl font-bold text-cyan-700;
    }

    .popup-body {
        @apply mt-4 py-4 border-y-2 border-gray-200;
    }

    .popup-buttons {
        @apply flex justify-end space-x-4 mt-4 text-sm;
    }

    .primary-button {
        @apply bg-cyan-700 text-white font-semibold px-4 rounded-md py-1 hover:bg-cyan-900
    }

    .secondary-button {
        @apply border border-2 border-cyan-700 text-cyan-700 font-semibold px-4 rounded-md py-1 hover:bg-cyan-100;
    }
</style>
