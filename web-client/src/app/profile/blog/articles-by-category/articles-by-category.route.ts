import { ArticlesByCategoryComponent } from './articles-by-category.component'
import { ResolvePagingParamsService } from '../../../shared'

export const articlesByCategoryRoute = {
  path: ':category',
  component: ArticlesByCategoryComponent,
  resolve: { 'pagingParams': ResolvePagingParamsService }
}
