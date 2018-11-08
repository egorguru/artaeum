import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'

import { SharedModule } from '../shared'
import { searchRoutes } from './search.route'
import { SearchComponent } from './search.component'

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(searchRoutes)
  ],
  declarations: [
    SearchComponent
  ]
})
export class SearchModule {}
