import { Routes } from '@angular/router'

import { allArticlesRoute } from './all-articles'
import { singleArticleRoute } from './single-article'

export const articleRoutes: Routes = [{
  path: 'articles',
  children: [
    allArticlesRoute,
    singleArticleRoute
  ]
}]
