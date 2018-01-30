import {Validators} from '@angular/forms'

export const emailValidator = Validators.compose([Validators.required, Validators.email])
