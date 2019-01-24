import { BlogComponent } from './blog.component'
import { ResolvePagingParamsService } from '../../shared'
import { allArticlesRoute } from './all-articles'
import { articlesByCategoryRoute } from './articles-by-category'

export const blogRoutes = {
  path: 'blog',
  component: BlogComponent,
  resolve: { 'pagingParams': ResolvePagingParamsService },
  children: [
    allArticlesRoute,
    articlesByCategoryRoute
  ]
}
