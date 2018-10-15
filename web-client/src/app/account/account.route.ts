import { Routes } from '@angular/router'

const ACCOUNT_ROUTES = []

export const accountRoutes: Routes = [{
  path: '',
  children: ACCOUNT_ROUTES
}]
