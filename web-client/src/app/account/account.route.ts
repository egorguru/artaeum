import { Routes } from '@angular/router'
import { loginRoute } from './login/login.route'

const ACCOUNT_ROUTES = [
  loginRoute
]

export const accountRoutes: Routes = [{
  path: '',
  children: ACCOUNT_ROUTES
}]
