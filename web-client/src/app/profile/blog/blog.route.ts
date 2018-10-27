import { BlogComponent } from './blog.component'
import { ResolvePagingParamsService } from '../../shared'

export const blogRoute = {
  path: 'blog',
  component: BlogComponent,
  resolve: { 'pagingParams': ResolvePagingParamsService }
}
