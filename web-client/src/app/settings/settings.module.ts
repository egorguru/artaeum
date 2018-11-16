import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'

import { SharedModule } from '../shared'
import { settingsRoutes } from './settings.route'
import { SettingsComponent } from './settings.component'
import { ChangeCommonComponent } from './change-common'
import { ChangePasswordComponent } from './change-password'
import { ChangeAvatarComponent } from './change-avatar'
import { ChangeBackgroundComponent } from './change-background'

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(settingsRoutes)
  ],
  declarations: [
    SettingsComponent,
    ChangeCommonComponent,
    ChangePasswordComponent,
    ChangeAvatarComponent,
    ChangeBackgroundComponent
  ]
})
export class SettingsModule {}
