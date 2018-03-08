import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {RouterModule} from '@angular/router'
import {ReactiveFormsModule} from '@angular/forms'
import {FlexLayoutModule} from '@angular/flex-layout'
import {PieChartModule} from '@swimlane/ngx-charts'
import {ScrollToModule} from '@nicky-lenaers/ngx-scroll-to'
import {
  MatToolbarModule, MatButtonModule,
  MatCardModule, MatInputModule,
  MatFormFieldModule, MatProgressSpinnerModule
} from '@angular/material'

import {TrimInputModule, ClassOnHoverModule, EleInViewModule} from '../../directives'
import {PillModule} from '../../components/pill'
import {BackgroundPolyModule} from '../../components/background-poly'

import {
  ExperienceItemComponent,
  LandingIntroComponent, ServicesComponent,
  ProjectsComponent, ProjectCardComponent,
  ContactService, ExperienceComponent,
  ContactComponent, SkillsComponent
} from './components'

import {HomeComponent} from './home.component'
import {homeRoutes} from './home.routes'

@NgModule({
  imports: [
    PillModule,
    BackgroundPolyModule,
    EleInViewModule,
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
    ExperienceComponent,
    ExperienceItemComponent,
    SkillsComponent,
    ServicesComponent,
    ProjectsComponent,
    LandingIntroComponent,
    ProjectCardComponent,
    HomeComponent
  ]
})
export class HomeModule { }
