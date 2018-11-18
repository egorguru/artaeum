import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'

import { homeRoute } from './home.route'
import { SharedModule } from '../shared'
import { ArticleModule } from '../article'
import { PostModule } from '../post'
import { HomeComponent } from './home.component'

@NgModule({
  imports: [
    RouterModule.forChild([homeRoute]),
    SharedModule,
    ArticleModule,
    PostModule
  ],
  declarations: [HomeComponent]
})
export class HomeModule {}
