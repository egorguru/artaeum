import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'

import { SharedModule } from '../shared'
import { postRoutes } from './post.route'
import { PostComponent } from './post'

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(postRoutes)
  ],
  declarations: [
    PostComponent
  ]
})
export class PostModule {}
