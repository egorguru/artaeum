import { CreateUpdateArticleComponent } from './create-update-article.component'

export const createUpdateArticleRoutes = [
  {
    path: 'article',
    component: CreateUpdateArticleComponent
  },
  {
    path: 'article/:id',
    component: CreateUpdateArticleComponent
  }
]
