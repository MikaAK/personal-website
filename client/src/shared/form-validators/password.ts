import {Validators, ValidatorFn} from '@angular/forms'

const PASSWORD_MIN_LENGTH = 8

export const passwordValidator = <ValidatorFn>Validators.compose([
  Validators.required,
  Validators.minLength(PASSWORD_MIN_LENGTH)
])
