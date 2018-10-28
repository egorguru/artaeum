import { Routes } from '@angular/router'

import { postRoute } from './post'

export const postRoutes: Routes = [{
  path: 'posts',
  children: [
    postRoute
  ]
}]
