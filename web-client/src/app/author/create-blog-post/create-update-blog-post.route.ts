import { CreateUpdateBlogPostComponent } from './create-update-blog-post.component'

export const createUpdateBlogPostRoutes = [
  {
    path: 'blogs',
    component: CreateUpdateBlogPostComponent
  },
  {
    path: 'blogs/:id',
    component: CreateUpdateBlogPostComponent
  }
]
