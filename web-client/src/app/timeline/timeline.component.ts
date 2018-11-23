import { Component, OnInit } from '@angular/core'
import { Title } from '@angular/platform-browser'

@Component({
  selector: 'ae-timeline',
  templateUrl: './timeline.component.html'
})
export class TimelineComponent implements OnInit {

  constructor(private title: Title) {}

  ngOnInit() {
    this.title.setTitle('My timeline - Artaeum')
  }
}
