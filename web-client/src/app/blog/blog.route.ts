import { Routes } from '@angular/router'
import { blogPostRoute } from './blog-post'

export const blogRoutes: Routes = [{
  path: 'blogs',
  children: [
    blogPostRoute
  ]
}]
