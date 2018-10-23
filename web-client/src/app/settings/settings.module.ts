import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'

import { SharedModule } from '../shared'
import { settingsRoutes } from './settings.route'
import { SettingsComponent } from './settings.component'

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(settingsRoutes)
  ],
  declarations: [
    SettingsComponent
  ]
})
export class SettingsModule {}
