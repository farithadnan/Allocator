export interface ICategory {
    id: number;
    audit: IAudit;
    name: string;
    code: string;
    description: string;
}

export interface IAudit {
    createdBy?: String;
    createdDate?: Date;
    updatedBy?: String;
    updatedDate?: Date;
  }

