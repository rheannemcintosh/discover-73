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
    import { ref } from 'vue';

    interface ActivityForm {
        name: string;
        description: string;
        status: 'To Do' | 'In Progress' | 'Done' | '';
    }

    interface ApiErrorResponse {
        errors: Record<string, string[]>;
    }

    // Define a type for API success response
    interface ApiSuccessResponse {
        user: {
            id: number;
            name: string;
            description: string;
            status: string;
        };
    }

    // Form data with initial values
    const form = ref<ActivityForm>({
        name: '',
        description: '',
        status: '',
    });

    const statusOptions = [
        { value: 'To Do', label: 'To Do' },
        { value: 'In Progress', label: 'In Progress' },
        { value: 'Done', label: 'Done' },
    ];

    // State for error and success messages
    const error = ref<string | null>(null);
    const successMessage = ref<string | null>(null);

    // Function to submit the form data using fetch
    const submitForm = async (): Promise<void> => {
        try {
            error.value = null;
            successMessage.value = null;

            // Send POST request using fetch
            const response = await fetch('http://discover-73-api.test/api/activity-groups', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify(form.value),
            });

            if (!response.ok) {
                const errorData: ApiErrorResponse = await response.json();
                if (errorData.errors) {
                    error.value = Object.values(errorData.errors).flat().join(', ');
                } else {
                    error.value = 'An error occurred while creating the activity group.';
                }
            } else {
                const data: ApiSuccessResponse = await response.json();
                successMessage.value = 'Activity Group created successfully!';

                form.value = {
                    name: '',
                    description: '',
                    status: '',
                };
            }
        } catch (err) {
            error.value = 'An error occurred while creating the activity group.';
            console.error(err);
        }
    };

    defineExpose({ submitForm})
</script>