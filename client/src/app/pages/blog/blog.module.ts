import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {RouterModule} from '@angular/router'
import {ReactiveFormsModule} from '@angular/forms'
import {FlexLayoutModule} from '@angular/flex-layout'
import {PieChartModule} from '@swimlane/ngx-charts'
import {ScrollToModule} from '@nicky-lenaers/ngx-scroll-to'
import {
  MatButtonModule,
  MatCardModule,
  MatFormFieldModule, MatProgressSpinnerModule
} from '@angular/material'

import {ClassOnHoverModule, EleInViewModule} from '../../directives'
import {PillModule} from '../../components/pill'
import {BackgroundPolyModule} from '../../components/background-poly'

import {BlogPostComponent} from './components'
import {BlogViewComponent} from './view'

import {BlogComponent} from './blog.component'
import {BlogService} from './blog.service'
import {blogRoutes} from './blog.routes'

@NgModule({
  imports: [
    PillModule,
    BackgroundPolyModule,
    EleInViewModule,
    ClassOnHoverModule,
    FlexLayoutModule,
    MatCardModule,
    MatFormFieldModule,
    MatButtonModule,
    PieChartModule,
    ScrollToModule,
    MatProgressSpinnerModule,
    ReactiveFormsModule,
    CommonModule,
    RouterModule.forChild(blogRoutes)
  ],
  providers: [BlogService],
  declarations: [BlogPostComponent, BlogComponent, BlogViewComponent]
})
export class BlogModule { }
