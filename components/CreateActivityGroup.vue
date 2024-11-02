<template>
    <div>
        <div class="pb-2">
            <ui-error-message :message="error" />
            <ui-success-message :message="successMessage" />
        </div>
        <form @submit.prevent="submitForm">
            <div class="">
                <div class="grid grid-cols-3 p-2">
                    <forms-label name="name">Name</forms-label>
                    <forms-text-input v-model="form.name" id="name" />
                </div>
                <div class="grid grid-cols-3 p-2">
                    <forms-label name="description">Description</forms-label>
                    <forms-text-input v-model="form.description" id="description" />
                </div>
                <div class="grid grid-cols-3 p-2">
                    <forms-label name="status">Status</forms-label>
                    <forms-select-input v-model="form.status" id="status" :options="statusOptions" />
                </div>
            </div>
        </form>
    </div>
</template>

<script setup lang="ts">
    import { useSubmitForm } from '~/composables/useSubmitForm';

    const { form, error, successMessage, submitForm } = useSubmitForm();

    const statusOptions = [
        { value: 'To Do', label: 'To Do' },
        { value: 'In Progress', label: 'In Progress' },
        { value: 'Done', label: 'Done' },
    ];

    defineExpose({ submitForm });
</script>