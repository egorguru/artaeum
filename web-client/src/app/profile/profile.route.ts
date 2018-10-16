import { Routes } from '@angular/router'
import { ProfileComponent } from './profile.component'

export const profileRoutes: Routes = [{
  path: 'u/:login',
  component: ProfileComponent,
  children: []
}]
