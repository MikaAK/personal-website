import {NgModule} from '@angular/core'
import {RouterModule} from '@angular/router'
import {MatToolbarModule} from '@angular/material'
import {FlexLayoutModule} from '@angular/flex-layout'

import {CopyFooterComponent} from './copy-footer.component'

@NgModule({
  imports: [
    FlexLayoutModule,
    MatToolbarModule,
    RouterModule
  ],
  exports: [CopyFooterComponent],
  declarations: [CopyFooterComponent]
})
export class CopyFooterModule { }
