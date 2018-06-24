import {AbstractControl} from '@angular/forms'
import {head} from 'ramda'

export const getFormControlName = (control: AbstractControl): string => {
  const controlTuple = Object.entries(control.parent.controls)
    .find(([, pControl]) => pControl === control)

  if (controlTuple)
    return <string>head(controlTuple)
  else
    throw new Error('Control must be a part of a FormGroup and be keyed under a User property to use this validation')
}
