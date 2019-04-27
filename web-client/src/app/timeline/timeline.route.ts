import { Routes } from '@angular/router'

import { TimelineComponent } from './timeline.component'
import { UserRouteAccessService } from '../shared'
import { lastArticlesRoute } from './last-articles'

export const timelineRoutes: Routes = [{
  path: 'timeline',
  component: TimelineComponent,
  data: {
    authorities: ['user']
  },
  canActivate: [UserRouteAccessService],
  children: [lastArticlesRoute]
}]
