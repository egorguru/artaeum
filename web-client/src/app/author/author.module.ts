import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'

import { SharedModule } from '../shared'
import { authorRoutes } from './author.route'
import { CreateUpdateBlogPostComponent } from './create-blog-post'

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(authorRoutes)
  ],
  declarations: [
    CreateUpdateBlogPostComponent
  ]
})
export class AuthorModule {}
