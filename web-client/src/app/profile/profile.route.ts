import { Routes } from '@angular/router'
import { ProfileComponent } from './profile.component'
import { wallRoute } from './wall'
import { blogRoute } from './blog'

export const profileRoutes: Routes = [{
  path: 'u/:login',
  component: ProfileComponent,
  children: [
    wallRoute,
    blogRoute
  ]
}]
