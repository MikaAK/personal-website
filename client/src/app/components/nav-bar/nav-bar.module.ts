import {NgModule} from '@angular/core'
import {RouterModule} from '@angular/router'
import {MatToolbarModule} from '@angular/material'
import {FlexLayoutModule} from '@angular/flex-layout'
import {ScrollToModule} from '@nicky-lenaers/ngx-scroll-to'

import {NavBarComponent} from './nav-bar.component'

@NgModule({
  imports: [
    FlexLayoutModule,
    MatToolbarModule,
    RouterModule,
    ScrollToModule.forRoot()
  ],
  exports: [NavBarComponent],
  declarations: [NavBarComponent]
})
export class NavBarModule { }
