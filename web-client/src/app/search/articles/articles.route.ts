import { ArticlesComponent } from './articles.component'
import { ResolvePagingParamsService } from '../../shared'

export const articlesRoute = {
  path: 'articles',
  component: ArticlesComponent,
  resolve: { 'pagingParams': ResolvePagingParamsService }
}
