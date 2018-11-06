import { Routes } from '@angular/router'

import { TimelineComponent } from './timeline.component'
import { UserRouteAccessService } from '../shared'
import { lastPostsRoute } from './last-posts'

export const timelineRoutes: Routes = [{
  path: 'timeline',
  component: TimelineComponent,
  data: {
    authorities: ['user']
  },
  canActivate: [UserRouteAccessService],
  children: [
    lastPostsRoute
  ]
}]
