import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'

import { SharedModule } from '../shared'
import { accountRoutes } from './account.route'
import { LoginComponent } from './login/login.component'
import { RegisterComponent } from './register/register.component'
import { ActivationComponent } from './activation/activation.component'
import { PasswordResetInitComponent } from './password-reset/init/password-reset-init.component'
import { PasswordResetFinishComponent } from './password-reset/finish/password-reset-finish.component'

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(accountRoutes)
  ],
  declarations: [
    LoginComponent,
    RegisterComponent,
    ActivationComponent,
    PasswordResetInitComponent,
    PasswordResetFinishComponent
  ]
})
export class AccountModule {}
