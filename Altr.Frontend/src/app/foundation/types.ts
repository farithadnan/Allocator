import { FormGroup } from "@angular/forms";
export interface AltrTableColumn {
    name: string; // column name
    dataKey: string; // name of key of the actual data in this column
    position?: 'right' | 'left'; //should it be right-aligned or left-aligned
    isSortable?: boolean; // can column be sorted
}

export interface AltrDialog {
    titleSrc: string;
    contentSrc: FormGroup | string;
    cancelText: string;
    confirmText?: string;
}

export interface IFormField {
    label: string;
    fieldName: string;
    fieldType: string;
    fieldValue: string;
    placeholder: string;
    values: IDropdown[];
}

export interface IDropdown {
    displayValue: string;
    internalValue: string;
}

