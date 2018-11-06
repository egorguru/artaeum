import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'

import { SharedModule } from '../shared'
import { blogRoutes } from './blog.route'
import { AllBlogPostsComponent } from './all-blog-posts'
import { BlogPostComponent } from './blog-post'

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(blogRoutes)
  ],
  declarations: [
    AllBlogPostsComponent,
    BlogPostComponent
  ]
})
export class BlogModule {}
