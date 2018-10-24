import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'

import { SharedModule } from '../shared'
import { settingsRoutes } from './settings.route'
import { SettingsComponent } from './settings.component'
import { ChangeCommonComponent } from './change-common'
import { ChangePasswordComponent } from './change-password'

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(settingsRoutes)
  ],
  declarations: [
    SettingsComponent,
    ChangeCommonComponent,
    ChangePasswordComponent
  ]
})
export class SettingsModule {}
