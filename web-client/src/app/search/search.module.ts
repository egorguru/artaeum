import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'

import { SharedModule } from '../shared'
import { searchRoutes } from './search.route'

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(searchRoutes)
  ],
  declarations: []
})
export class SearchModule {}
