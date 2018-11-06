import { CreateUpdateArticleComponent } from './create-update-article.component'

export const createUpdateArticleRoutes = [
  {
    path: 'articles',
    component: CreateUpdateArticleComponent
  },
  {
    path: 'articles/:id',
    component: CreateUpdateArticleComponent
  }
]
