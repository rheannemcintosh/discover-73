<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { ActivityGroup } from '~/types/activityGroup';
import { getActivityGroups } from '~/composables/getActivityGroups';

const activityGroups = ref<ActivityGroup[]>([]);
const error = ref<string | null>(null);

onMounted(async () => {
    try {
        activityGroups.value = await getActivityGroups();
    } catch (err) {
        error.value = (err as Error).message;
    }
});

// Function to delete an activity group
const deleteActivityGroup = async (id: number) => {
    try {
        // Send DELETE request to the API
        const response = await fetch(`http://discover-73-api.test/api/activity-groups/${id}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Failed to delete the activity group');
        }

        // Remove the deleted activity group from the activityGroups array
        activityGroups.value = activityGroups.value.filter(group => group.id !== id);
    } catch (err) {
        error.value = (err as Error).message;
    }
};
</script>

<template>
    <div>
        <h1>Activity Groups</h1>
        <div v-if="error" class="error">{{ error }}</div>
        <div v-for="group in activityGroups" :key="group.id">
            <ul>
                <li>
                    <strong>ID: </strong>
                    {{ group.id }}
                </li>
                <li>
                    <strong>Activity Group: </strong>
                    {{ group.name }}
                </li>
                <li>
                    <strong>Description:</strong>
                    {{ group.description }}
                </li>
                <li>
                    <strong>Status:</strong>
                    {{ group.status }}
                </li>
                <li>
                    <!-- Delete button for each activity group -->
                    <button @click="deleteActivityGroup(group.id)">Delete</button>
                </li>
                <hr>
            </ul>
        </div>
    </div>
</template>

