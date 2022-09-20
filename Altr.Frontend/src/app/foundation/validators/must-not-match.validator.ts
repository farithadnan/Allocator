import { AbstractControl, ValidationErrors } from '@angular/forms';
import { CrudService } from '../services/crud.service';

// custom validator to check whether this two field is match or not
export function MustNotMatch(crudService: CrudService, controlName: string, type: string, endPoint: string): ValidationErrors | null {
    return (controls: AbstractControl) => {
        const formControl = controls.get(controlName);

        if (formControl && type && endPoint) {
            let isThereDuplicate = false;

            // Check if the code already exist or not
            switch(type.toLowerCase()) {
                case 'category': {
                    for (const iterator of crudService.categoryList) {
                        if (iterator.code === formControl.value) {
                            isThereDuplicate = true;
                        }
                    }
                }
            }

            if (isThereDuplicate && formControl.value) {
                return formControl.setErrors({ mustNotMatch: true });
            }
        } else {
            return null;
        }

    }
}

