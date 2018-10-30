import { Routes } from '@angular/router'
import { ProfileComponent } from './profile.component'
import { wallRoute } from './wall'
import { blogRoute } from './blog'
import { subscribertsRoute } from './subscribers'

export const profileRoutes: Routes = [{
  path: 'u/:login',
  component: ProfileComponent,
  children: [
    wallRoute,
    blogRoute,
    subscribertsRoute
  ]
}]
