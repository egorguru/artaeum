import { PostsComponent } from './posts.component'
import { ResolvePagingParamsService } from '../../shared'

export const postsRoute = {
  path: '',
  component: PostsComponent,
  resolve: { 'pagingParams': ResolvePagingParamsService }
}
