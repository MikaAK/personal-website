import {Validators} from '@angular/forms'

const MIN_AGE = 18

export const minAgeValidator = Validators.compose([Validators.required, Validators.min(MIN_AGE)])
