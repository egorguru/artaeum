import { ProfilesComponent } from './profiles.component'
import { ResolvePagingParamsService } from '../../shared'

export const profilesRoute = {
  path: 'profiles',
  component: ProfilesComponent,
  resolve: { 'pagingParams': ResolvePagingParamsService }
}
