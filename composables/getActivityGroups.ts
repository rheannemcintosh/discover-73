import { type ActivityGroup } from "~/types/ActivityGroup";

export const getActivityGroups = async (): Promise<ActivityGroup[]> => {
    try {
        const config = useRuntimeConfig();
        return await $fetch<ActivityGroup[]>(`${config.public.apiBaseUrl}/activity-groups`);
    } catch (error) {
        throw new Error("Failed to load activity groups:");
    }
};
