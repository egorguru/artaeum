import { Routes } from '@angular/router'
import { loginRoute } from './login/login.route'
import { registerRoute } from './register/register.route'
import { activationRoute } from './activation/activation.route'

export const accountRoutes: Routes = [
  loginRoute,
  registerRoute,
  activationRoute
]
