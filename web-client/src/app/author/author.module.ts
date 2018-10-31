import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'

import { SharedModule } from '../shared'
import { authorRoutes } from './author.route'
import { CreateUpdateBlogPostComponent } from './create-blog-post'
import { AuthorComponent } from './author.component'

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(authorRoutes)
  ],
  declarations: [
    AuthorComponent,
    CreateUpdateBlogPostComponent
  ]
})
export class AuthorModule {}
