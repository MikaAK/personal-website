import {FormGroup} from '@angular/forms'

export const formGroupControlErrors = (formGroup: FormGroup, controlName: string): {[key: string]: boolean} => {
  const control = formGroup.get(controlName)

  return control ? (control.errors || {}) : {}
}
