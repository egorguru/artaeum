import { Routes } from '@angular/router'
import { loginRoute } from './login/login.route'
import { registerRoute } from './register/register.route'

const ACCOUNT_ROUTES = [
  loginRoute,
  registerRoute
]

export const accountRoutes: Routes = [{
  path: '',
  children: ACCOUNT_ROUTES
}]
