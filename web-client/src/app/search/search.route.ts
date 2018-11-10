import { Routes } from '@angular/router'

import { SearchComponent } from './search.component'
import { postsRoute } from './posts';

export const searchRoutes: Routes = [{
  path: 'search',
  component: SearchComponent,
  children: [
    postsRoute
  ]
}]
