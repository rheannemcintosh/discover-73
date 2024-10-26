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
</script>

<template>
    <div>
        <h1>Activity Groups</h1>
        <div v-for="group in activityGroups">
            <ul>
                <li>
                    <strong>ID: </strong>
                    {{ group.id }}
                </li>
                <li>
                    <strong>Activity Group: </strong>
                    {{group.name}}
                </li>
                <li>
                    <strong>Description:</strong>
                    {{ group.description }}
                </li>
                <li>
                    <strong>Status</strong>
                    {{ group.status }}
                </li>
                <hr>
            </ul>
        </div>
    </div>
</template>








