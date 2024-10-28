import type {Activity} from "~/types/Activity";

export interface ActivityGroup {
    id: number;
    name: string;
    description: string;
    status: string;
    activities: Activity[];
}
