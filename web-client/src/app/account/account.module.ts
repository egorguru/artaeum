import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'

import { SharedModule } from '../shared'
import { accountRoutes } from './account.route'
import { LoginComponent } from './login/login.component'

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(accountRoutes)
  ],
  declarations: [
    LoginComponent
  ]
})
export class AccountModule {}
