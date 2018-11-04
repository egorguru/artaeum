import { Routes } from '@angular/router'
import { lastPostsRoute } from './last-posts';

export const timelineRoutes: Routes = [{
  path: 'timeline',
  children: [
    lastPostsRoute
  ]
}]
