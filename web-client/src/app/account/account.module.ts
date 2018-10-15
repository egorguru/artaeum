import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'

import { SharedModule } from '../shared'
import { accountRoutes } from './account.route'

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(accountRoutes)
  ],
  declarations: []
})
export class AccountModule {}
