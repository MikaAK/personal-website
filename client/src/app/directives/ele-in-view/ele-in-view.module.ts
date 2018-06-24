import 'intersection-observer'

import {EleInViewDirective} from './ele-in-view.directive'

import {NgModule} from '@angular/core'

@NgModule({
  exports: [EleInViewDirective],
  declarations: [EleInViewDirective]
})
export class EleInViewModule { }
