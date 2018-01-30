import {AbstractControl} from '@angular/forms'

// Use this on a form group
export const duplicateValueValidator = (formControl: AbstractControl) => (control: AbstractControl) => {
  return formControl.value === control.value ? null : {duplicateValue: true}
}
