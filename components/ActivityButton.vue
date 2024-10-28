<script setup lang="ts">

    import { computed } from "vue";

    const props = defineProps<{
        status: string;
    }>();

    const statusClass = computed(() => {
        switch (props.status) {
            case "To Do":
                return "bg-cyan-200 border-cyan-300 text-cyan-600 hover:bg-cyan-300";
            case "In Progress":
                return "bg-cyan-500 border-cyan-500 text-gray-100 hover:bg-cyan-600 striped";
            case "Done":
                return "bg-cyan-600 border-cyan-700 text-gray-100 hover:bg-cyan-700";
            default:
                return "bg-cyan-50 border-cyan-200 text-cyan-600 hover:bg-cyan-200";
        }
    });

    const icon = computed(() => {
        switch (props.status) {
            case "To Do":
                return "not_started";
            case "In Progress":
                return "clock_loader_60";
            case "Done":
                return "star";
            default:
                return "help";
        }
    });

</script>

<template>
    <button
        :class="[
            'w-16 h-16 border-2 rounded-md flex items-center justify-center text-sm',
            statusClass
        ]"
    >
        <span class="material-symbols-rounded">
            {{ icon }}
        </span>
    </button>
</template>

<style scoped lang="postcss">
    .striped {
        background-image: repeating-linear-gradient(
            45deg,
            rgba(255, 255, 255, 0.1),
            rgba(255, 255, 255, 0.1) 10px,
            rgba(0, 0, 0, 0) 10px,
            rgba(0, 0, 0, 0) 20px
        );
    }
</style>
