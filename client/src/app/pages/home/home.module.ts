import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {RouterModule} from '@angular/router'
import {ReactiveFormsModule} from '@angular/forms'
import {MatToolbarModule, MatButtonModule, MatCardModule, MatInputModule} from '@angular/material'
import {FlexLayoutModule} from '@angular/flex-layout'
import {PieChartModule} from '@swimlane/ngx-charts'

import {TrimInputModule} from '../../directives'
import {PillModule} from '../../components/pill'

import {
  LandingIntroComponent,
  ServicesComponent,
  ContactComponent,
  SkillsComponent,
  ProjectsComponent
} from './components'

import {HomeComponent} from './home.component'
import {homeRoutes} from './home.routes'

@NgModule({
  imports: [
    PillModule,
    TrimInputModule,
    FlexLayoutModule,
    MatCardModule,
    MatToolbarModule,
    MatInputModule,
    MatButtonModule,
    PieChartModule,
    ReactiveFormsModule,
    CommonModule,
    RouterModule.forChild(homeRoutes)
  ],
  declarations: [
    ContactComponent,
    SkillsComponent,
    ServicesComponent,
    ProjectsComponent,
    LandingIntroComponent,
    HomeComponent
  ]
})
export class HomeModule { }
