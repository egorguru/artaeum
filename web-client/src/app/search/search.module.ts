import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'

import { SharedModule } from '../shared'
import { searchRoutes } from './search.route'
import { SearchComponent } from './search.component'
import { PostsComponent } from './posts'
import { ArticlesComponent } from './articles'
import { ProfilesComponent } from './profiles'

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(searchRoutes)
  ],
  declarations: [
    SearchComponent,
    PostsComponent,
    ArticlesComponent,
    ProfilesComponent
  ]
})
export class SearchModule {}
