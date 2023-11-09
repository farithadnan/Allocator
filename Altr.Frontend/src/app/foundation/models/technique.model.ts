import { CategorySets } from "./categorySets.Model";

export interface TechniqueModel {
    id: number;
    name: string;
    code: string;
    description: string;
    categorySets: CategorySets[];
    createdBy: string | null;
    createdDate: Date | null;
    updatedBy: string | null;
    updatedDate: Date | null;
}

