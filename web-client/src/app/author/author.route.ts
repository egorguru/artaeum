import { Routes } from '@angular/router'
import { UserRouteAccessService } from '../shared'

import { AuthorComponent } from './author.component'
import { dashboardRoute } from './dashboard'
import { createUpdateBlogPostRoutes } from './create-blog-post'

export const authorRoutes: Routes = [{
  path: 'author',
  component: AuthorComponent,
  data: {
    authorities: ['user']
  },
  canActivate: [UserRouteAccessService],
  children: [
    dashboardRoute,
    ...createUpdateBlogPostRoutes
  ]
}]
