import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'

import { SharedModule } from '../shared'
import { timelineRoutes } from './timeline.route'

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(timelineRoutes)
  ],
  declarations: []
})
export class TimelineModule {}
