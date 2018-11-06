import { Routes } from '@angular/router'

import { allBlogPostsRoute } from './all-blog-posts'
import { blogPostRoute } from './blog-post'

export const blogRoutes: Routes = [{
  path: 'blogs',
  children: [
    allBlogPostsRoute,
    blogPostRoute
  ]
}]
