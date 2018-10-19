import { WallComponent } from './wall.component'
import { ResolvePagingParamsService } from '../../shared'

export const wallRoute = {
  path: '',
  component: WallComponent,
  resolve: { 'pagingParams': ResolvePagingParamsService }
}
