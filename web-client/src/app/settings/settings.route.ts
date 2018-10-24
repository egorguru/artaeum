import { Routes } from '@angular/router'

import { SettingsComponent } from './settings.component'
import { UserRouteAccessService } from '../shared'
import { changeCommonRoute } from './change-common'
import { changePasswordRoute } from './change-password'

export const settingsRoutes: Routes = [{
  path: 'settings',
  component: SettingsComponent,
  data: {
    authorities: ['user']
  },
  canActivate: [UserRouteAccessService],
  children: [
    changeCommonRoute,
    changePasswordRoute
  ]
}]
