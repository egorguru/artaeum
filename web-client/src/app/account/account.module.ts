import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'

import { SharedModule } from '../shared'
import { accountRoutes } from './account.route'
import { LoginComponent } from './login/login.component'
import { RegisterComponent } from './register/register.component'
import { ActivationComponent } from './activation/activation.component'

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(accountRoutes)
  ],
  declarations: [
    LoginComponent,
    RegisterComponent,
    ActivationComponent
  ]
})
export class AccountModule {}
