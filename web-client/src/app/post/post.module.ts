import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'

import { SharedModule } from '../shared'
import { postRoutes } from './post.route'
import { SinglePostComponent } from './single-post'

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(postRoutes)
  ],
  declarations: [
    SinglePostComponent
  ]
})
export class PostModule {}
