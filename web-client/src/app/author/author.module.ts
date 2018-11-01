import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'

import { SharedModule } from '../shared'
import { authorRoutes } from './author.route'
import { CreateUpdateBlogPostComponent } from './create-blog-post'
import { AuthorComponent } from './author.component'
import { DashboardComponent } from './dashboard'

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(authorRoutes)
  ],
  declarations: [
    AuthorComponent,
    CreateUpdateBlogPostComponent,
    DashboardComponent
  ]
})
export class AuthorModule {}
