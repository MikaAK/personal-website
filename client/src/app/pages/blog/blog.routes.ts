import {Routes} from '@angular/router'
import {BlogComponent} from './blog.component'
import {BlogViewComponent} from './view'

export const blogRoutes: Routes = [{
  path: '',
  component: BlogComponent,
  pathMatch: 'full'
}, {
  path: ':slug',
  component: BlogViewComponent
}]
