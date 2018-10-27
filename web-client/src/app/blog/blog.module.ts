import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'

import { SharedModule } from '../shared'
import { blogRoutes } from './blog.route'
import { BlogPostComponent } from './blog-post'

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(blogRoutes)
  ],
  declarations: [
    BlogPostComponent
  ]
})
export class BlogModule {}
