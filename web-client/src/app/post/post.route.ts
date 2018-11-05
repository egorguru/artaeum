import { Routes } from '@angular/router'

import { allPostsRoute } from './all-posts'
import { singlePostRoute } from './single-post'

export const postRoutes: Routes = [{
  path: 'posts',
  children: [
    allPostsRoute,
    singlePostRoute
  ]
}]
