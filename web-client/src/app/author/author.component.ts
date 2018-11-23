import { Component, OnInit } from '@angular/core'
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'ae-author',
  templateUrl: './author.component.html'
})
export class AuthorComponent implements OnInit {

  constructor(private title: Title) {}

  ngOnInit() {
    this.title.setTitle('Author\'s management - Artaeum')
  }
}
