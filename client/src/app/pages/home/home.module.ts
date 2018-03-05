import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {RouterModule} from '@angular/router'
import {ReactiveFormsModule} from '@angular/forms'
import {
  MatToolbarModule, MatButtonModule,
  MatCardModule, MatInputModule,
  MatFormFieldModule, MatProgressSpinnerModule
} from '@angular/material'
import {FlexLayoutModule} from '@angular/flex-layout'
import {PieChartModule} from '@swimlane/ngx-charts'
import {ScrollToModule} from '@nicky-lenaers/ngx-scroll-to'

import {TrimInputModule, ClassOnHoverModule} from '../../directives'
import {PillModule} from '../../components/pill'
import {BackgroundPolyModule} from '../../components/background-poly'

import {
  LandingIntroComponent,
  ServicesComponent,
  ContactComponent,
  SkillsComponent,
  ProjectsComponent,
  ProjectCardComponent,
  ContactService
} from './components'

import {HomeComponent} from './home.component'
import {homeRoutes} from './home.routes'

@NgModule({
  imports: [
    PillModule,
    BackgroundPolyModule,
    ClassOnHoverModule,
    TrimInputModule,
    FlexLayoutModule,
    MatCardModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    PieChartModule,
    ScrollToModule,
    MatProgressSpinnerModule,
    ReactiveFormsModule,
    CommonModule,
    RouterModule.forChild(homeRoutes)
  ],
  providers: [ContactService],
  declarations: [
    ContactComponent,
    SkillsComponent,
    ServicesComponent,
    ProjectsComponent,
    LandingIntroComponent,
    ProjectCardComponent,
    HomeComponent
  ]
})
export class HomeModule { }
