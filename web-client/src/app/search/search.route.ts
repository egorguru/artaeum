import { Routes } from '@angular/router'

import { SearchComponent } from './search.component'

export const searchRoutes: Routes = [{
  path: 'search',
  component: SearchComponent,
  children: []
}]
