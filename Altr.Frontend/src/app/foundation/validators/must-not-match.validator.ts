import { FormGroup } from '@angular/forms';

// custom validator to check whether this two field is match or not
export function MustNotMatch(controlName: string, dataToCompare: string) {
    return (formGroup: FormGroup) => {
        const control = formGroup.controls[controlName];

        if (control.errors && !control.errors['mustNotMatch']) {
            // return if another validator has already found an error on the matchingControl
            return;
        }

        // set error on matchingControl if validation fails
        if (control.value === dataToCompare) {
            control.setErrors({ mustNotMatch: true });
        } else {
            control.setErrors(null);
        }
    }
}

