import { Routes } from '@angular/router'

import { singlePostRoute } from './single-post'

export const postRoutes: Routes = [{
  path: 'posts',
  children: [
    singlePostRoute
  ]
}]
