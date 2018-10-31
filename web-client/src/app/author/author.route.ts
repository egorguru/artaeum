import { Routes } from '@angular/router'
import { UserRouteAccessService } from '../shared'

import { createUpdateBlogPostRoutes } from './create-blog-post'

export const authorRoutes: Routes = [{
  path: 'author',
  data: {
    authorities: ['user']
  },
  canActivate: [UserRouteAccessService],
  children: [
    ...createUpdateBlogPostRoutes
  ]
}]
