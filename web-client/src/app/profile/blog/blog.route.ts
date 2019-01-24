import { BlogComponent } from './blog.component'
import { ResolvePagingParamsService } from '../../shared'

export const blogRoutes = {
  path: 'blog',
  component: BlogComponent,
  resolve: { 'pagingParams': ResolvePagingParamsService },
  children: []
}
