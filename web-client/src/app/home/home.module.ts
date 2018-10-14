import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'

import { HOME_ROUTE } from './home.route'
import { HomeComponent } from './home.component'

@NgModule({
  imports: [
    RouterModule.forChild([HOME_ROUTE])
  ],
  declarations: [HomeComponent]
})
export class HomeModule {}
