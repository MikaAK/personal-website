import {NgModule} from '@angular/core'

import {ClassOnHoverDirective} from './class-on-hover.directive'

@NgModule({
  declarations: [ClassOnHoverDirective],
  exports: [ClassOnHoverDirective]
})
export class ClassOnHoverModule { }
