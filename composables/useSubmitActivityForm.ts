import { ref } from 'vue';

interface ActivityForm {
    name: string;
    description: string;
    status: 'To Do' | 'In Progress' | 'Done' | '';
    activity_group_id: number;
}

interface ApiErrorResponse {
    errors: Record<string, string[]>;
}

interface ApiSuccessResponse {
    user: {
        id: number;
        name: string;
        description: string;
        status: string;
        activity_group_id: number;
    };
}

export function useSubmitActivityForm() {
    const form = ref<ActivityForm>({
        name: '',
        description: '',
        status: '',
        activity_group_id: 0,
    });

    const error = ref<string | null>(null);
    const successMessage = ref<string | null>(null);

    const submitForm = async (): Promise<void> => {
        try {
            error.value = null;
            successMessage.value = null;

            const response = await fetch('http://discover-73-api.test/api/activity', {
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
                    activity_group_id: 0,
                };
            }
        } catch (err) {
            error.value = 'An error occurred while creating the activity group.';
            console.error(err);
        }
    };

    return {
        form,
        error,
        successMessage,
        submitForm,
    };
}