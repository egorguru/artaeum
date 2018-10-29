import { Routes } from '@angular/router'

import { createUpdateBlogPostRoutes } from './create-blog-post'

export const authorRoutes: Routes = [{
  path: 'author',
  children: [
    ...createUpdateBlogPostRoutes
  ]
}]
