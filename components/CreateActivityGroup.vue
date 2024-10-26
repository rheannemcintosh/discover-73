<template>
    <div>
        <h1>Create Activity Group</h1>
        <form @submit.prevent="submitForm">
            <div>
                <label for="name">Name:</label>
                <input type="text" v-model="form.name" id="name" />
            </div>
            <div>
                <label for="description">Description:</label>
                <input type="text" v-model="form.description" id="description" />
            </div>
            <div>
                <label for="status">Status:</label>
                <select v-model="form.status" id="status">
                    <option value="" disabled>Please Select</option>
                    <option value="To Do">To Do</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Done">Done</option>
                </select>
            </div>
            <button type="submit">Create Activity Group</button>
        </form>

        <div v-if="error" class="error">
            <p>{{ error }}</p>
        </div>
        <div v-if="successMessage" class="success">
            <p>{{ successMessage }}</p>
        </div>
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
</script>