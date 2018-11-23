import { Component, OnInit } from '@angular/core'
import { Title } from '@angular/platform-browser'

@Component({
  selector: 'ae-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {

  showVal = 'articles'

  constructor(private title: Title) {}

  ngOnInit() {
    this.title.setTitle('Home - Artaeum')
  }

  show(val: string): void {
    this.showVal = val
  }
}
