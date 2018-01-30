import {Routes} from '@angular/router'

export const routes: Routes = [{
  path: '',
  pathMatch: 'full',
  loadChildren: './pages/home/home.module#HomeModule'
}]
