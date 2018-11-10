import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'

import { SharedModule } from '../shared'
import { searchRoutes } from './search.route'
import { SearchComponent } from './search.component'
import { PostsComponent } from './posts'
import { ArticlesComponent } from './articles'

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(searchRoutes)
  ],
  declarations: [
    SearchComponent,
    PostsComponent,
    ArticlesComponent
  ]
})
export class SearchModule {}
