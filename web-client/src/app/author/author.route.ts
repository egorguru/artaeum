import { Routes } from '@angular/router'
import { UserRouteAccessService } from '../shared'

import { AuthorComponent } from './author.component'
import { dashboardRoute } from './dashboard'
import { createUpdateArticleRoutes } from './create-update-article'
import { categoriesRoute } from './categories'

export const authorRoutes: Routes = [{
  path: 'author',
  component: AuthorComponent,
  data: {
    authorities: ['user']
  },
  canActivate: [UserRouteAccessService],
  children: [
    dashboardRoute,
    ...createUpdateArticleRoutes,
    categoriesRoute
  ]
}]
