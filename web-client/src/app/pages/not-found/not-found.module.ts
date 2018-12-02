import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'

import { SharedModule } from '../../shared'
import { NotFoundComponent } from './not-found.component'
import { routes } from './not-found.route'

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    SharedModule
  ],
  declarations: [NotFoundComponent]
})
export class NotFoundModule {}
