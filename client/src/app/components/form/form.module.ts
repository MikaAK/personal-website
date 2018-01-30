import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {MatInputModule, MatInput} from '@angular/material'
import {FlexLayoutModule} from '@angular/flex-layout'

import {AppFormErrorComponent} from './form-error/form-error.component'
import {AppFormFieldComponent} from './form-field/form-field.component'

@NgModule({
  imports: [CommonModule, MatInputModule, FlexLayoutModule],
  exports: [MatInput, AppFormErrorComponent, AppFormFieldComponent],
  declarations: [AppFormErrorComponent, AppFormFieldComponent]
})
export class AppFormModule { }
