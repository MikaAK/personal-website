import {ValidatorFn, AbstractControl} from '@angular/forms'

import {anyTrue} from '../helpers/util'

export const oneControlTrueValidator: ValidatorFn = (control: AbstractControl) => {
  const isValid = anyTrue(control.value)

  if (isValid)
    return null
  else
    return {oneTrue: true}
}
