import { Routes } from '@angular/router'

import { SearchComponent } from './search.component'
import { postsRoute } from './posts'
import { articlesRoute } from './articles'

export const searchRoutes: Routes = [{
  path: 'search',
  component: SearchComponent,
  children: [
    postsRoute,
    articlesRoute
  ]
}]
