<script setup lang="ts">
    import { ref, useTemplateRef, onMounted, onUpdated } from 'vue';
    import { ActivityGroup } from '~/types/activityGroup';
    import type {Activity} from "~/types/Activity";

    const activityGroups = ref<ActivityGroup[]>([]);
    const error = ref<string | null>(null);

    onMounted(async () => {
        try {
            activityGroups.value = await getActivityGroups();
        } catch (err) {
            error.value = (err as Error).message;
        }
    });

    onUpdated(async () => {
        try {
            activityGroups.value = await getActivityGroups();
        } catch (err) {
            error.value = (err as Error).message;
        }
    });

    const showPopup = ref(false);
    const showActivityGroupPopup = ref(false);
    const showActivityPopup = ref(false);

    const selectedActivity = ref<Activity | null>()
    const selectedGroup = ref<ActivityGroup | null>(null);

    const openPopup = (activity: Activity) => {
        selectedActivity.value = activity; // Set the selected activity
        showPopup.value = true; // Show the popup
    };

    const openActivityPopup = (group: ActivityGroup) => {
        selectedGroup.value = group;
        showActivityPopup.value = true;
    };

    const closePopup = () => {
        selectedActivity.value = null;
        showPopup.value = false;
    }
    
    const handleSubmit = () => {
        console.log('Submit button clicked!');
        showPopup.value = false;
    };

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

    const form1 = useTemplateRef('form1')
    const form2 = useTemplateRef('form2')
    
    const submitAllForms = () => {
        if (form1.value) form1.value.submitForm()
        if (form2.value) form2.value.submitForm()
    }

</script>

<template>
            <div class="flex justify-end">
                <button
                    class="ml-4 px-4 py-2 bg-green-600 text-white text-xs rounded-md hover:bg-green-700"
                    @click="showActivityGroupPopup = true"
                >
                    Create Activity Group
                </button>
            </div>

            <div class="mt-4 space-y-6">

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
                            @click="showPopup = true"
                        />

                        <ActivityButton
                            v-for="n in Math.max(0, 5 - group.activities.length)"
                            :key="'button-' + n"
                            status=""
                            @click="openActivityPopup(group)"
                        />
                    </div>

                    <button @click="deleteActivityGroup(group.id)" class="ml-4 px-4 py-2 bg-red-500 text-white text-xs rounded-md hover:bg-red-600">
                        Delete
                    </button>
                </div>
            </div>


        <Popup
            :title="'Activity Details'"
            :isVisible="showPopup"
            @close="closePopup"
        >
            <template #body>
                <div v-if="selectedActivity">
                    <p><strong>ID:</strong> {{ selectedActivity.id }}</p>
                    <p><strong>Name:</strong> {{ selectedActivity.name }}</p>
                    <p><strong>Description:</strong> {{ selectedActivity.description }}</p>
                    <p><strong>Status:</strong> {{ selectedActivity.status }}</p>
                </div>
                <div v-else>
                    <p>No activity selected</p>
                </div>
            </template>
        </Popup>

        <Popup
            :title="'Create Activity Group'"
            :isVisible="showActivityGroupPopup"
            @close="showActivityGroupPopup = false"
            @submit="submitAllForms"
        >
            <CreateActivityGroup ref="form1" />
        </Popup>

        <Popup
            :title="'Create Activity'"
            :isVisible="showActivityPopup"
            @close="showActivityPopup = false"
            @submit="submitAllForms"
        >
            <CreateActivity :group="selectedGroup" ref="form2" />
        </Popup>

</template>

