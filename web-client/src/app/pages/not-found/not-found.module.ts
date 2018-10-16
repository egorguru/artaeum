import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'

import { NotFoundComponent } from './not-found.component'
import { routes } from './not-found.route'

@NgModule({
  imports: [RouterModule.forChild(routes)],
  declarations: [NotFoundComponent]
})
export class NotFoundModule {}
