export interface CategoryModel{
    id: number;
    code: string;
    name: string;
    description: string;
    createdBy: string | null;
    createdDate: Date | null;
    updatedBy: string | null;
    updatedDate: Date | null;
}