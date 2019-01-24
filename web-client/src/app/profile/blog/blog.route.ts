import { BlogComponent } from './blog.component'
import { ResolvePagingParamsService } from '../../shared'
import { allArticlesRoute } from './all-articles'

export const blogRoutes = {
  path: 'blog',
  component: BlogComponent,
  resolve: { 'pagingParams': ResolvePagingParamsService },
  children: [
    allArticlesRoute
  ]
}
