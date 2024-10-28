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

    const deleteActivityGroup = async (id: number) => {
        try {
            const response = await fetch(`http://discover-73-api.test/api/activity-groups/${id}`, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Failed to delete the activity group');
            }

            activityGroups.value = activityGroups.value.filter(group => group.id !== id);
        } catch (err) {
            error.value = (err as Error).message;
        }
    };
</script>

<template>
    <div class="bg-gray-50">
        <div class="p-8 max-w-3xl mx-auto">
            <h1 class="text-4xl text-cyan-700 font-bold text-center mb-8">Discover 73</h1>
            <div class="space-y-6">
                <div v-for="group in activityGroups" :key="group.id" class="bg-white border border-gray-200 rounded-lg p-4 flex items-center">
                    <div class="flex-1">
                        <h2 class="text-lg font-semibold text-cyan-900">{{ group.id }}: {{ group.name }}</h2>
                        <p class="text-cyan-950">{{ group.description }}</p>
                    </div>

                    <div class="flex space-x-4">
                        <ActivityButton
                            v-for="(activity) in group.activities.slice(0, 5)"
                            :key="activity.id"
                            :status="activity.status"
                        />

                        <ActivityButton
                            v-for="n in Math.max(0, 5 - group.activities.length)"
                            :key="'button-' + n"
                            status=""
                        />
                    </div>

                    <button @click="deleteActivityGroup(group.id)" class="ml-4 px-4 py-2 bg-red-500 text-white text-xs rounded-md hover:bg-red-600">
                        Delete
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

