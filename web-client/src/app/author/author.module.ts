import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'

import { SharedModule } from '../shared'
import { authorRoutes } from './author.route'

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(authorRoutes)
  ],
  declarations: []
})
export class AuthorModule {}
