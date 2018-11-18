import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'

import { SharedModule } from '../shared'
import { articleRoutes } from './article.route'
import { AllArticlesComponent } from './all-articles'
import { SingleArticleComponent } from './single-article'

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(articleRoutes)
  ],
  declarations: [
    AllArticlesComponent,
    SingleArticleComponent
  ],
  exports: [AllArticlesComponent]
})
export class ArticleModule {}
