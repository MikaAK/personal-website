import {NgModule} from '@angular/core'
import {ReactiveFormsModule} from '@angular/forms'

import {TrimInputDirective} from './trim-input.directive'

@NgModule({
  imports: [ReactiveFormsModule],
  declarations: [TrimInputDirective],
  exports: [TrimInputDirective]
})
export class TrimInputModule { }
