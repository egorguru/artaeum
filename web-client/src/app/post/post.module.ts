import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'

import { SharedModule } from '../shared'
import { postRoutes } from './post.route'

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(postRoutes)
  ],
  declarations: []
})
export class PostModule {}
