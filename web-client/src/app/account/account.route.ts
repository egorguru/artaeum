import { Routes } from '@angular/router'
import { loginRoute } from './login/login.route'
import { registerRoute } from './register/register.route'
import { activationRoute } from './activation/activation.route'
import { passwordResetInitRoute } from './password-reset/init/password-reset-init.route'
import { passwordResetFinishRoute } from './password-reset/finish/password-reset-finish.route'

export const accountRoutes: Routes = [
  loginRoute,
  registerRoute,
  activationRoute,
  passwordResetInitRoute,
  passwordResetFinishRoute
]
