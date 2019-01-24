import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'

import { SharedModule } from '../shared'
import { profileRoutes } from './profile.route'
import { ProfileComponent } from './profile.component'
import { WallComponent, CreatePostComponent } from './wall'
import { BlogComponent, AllArticlesComponent } from './blog'
import { SubscribersComponent } from './subscribers'

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(profileRoutes)
  ],
  declarations: [
    ProfileComponent,
    WallComponent,
    CreatePostComponent,
    BlogComponent,
    AllArticlesComponent,
    SubscribersComponent
  ]
})
export class ProfileModule {}
