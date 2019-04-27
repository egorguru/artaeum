import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'

import { SharedModule } from '../shared'
import { timelineRoutes } from './timeline.route'
import { TimelineComponent } from './timeline.component'
import { LastArticlesComponent } from './last-articles'

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(timelineRoutes)
  ],
  declarations: [
    TimelineComponent,
    LastArticlesComponent
  ]
})
export class TimelineModule {}
