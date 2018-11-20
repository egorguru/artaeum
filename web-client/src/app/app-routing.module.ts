import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'

import { headerRoute } from './layouts/header/header.route'

@NgModule({
  imports: [
    RouterModule.forRoot([headerRoute], { useHash: false })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
