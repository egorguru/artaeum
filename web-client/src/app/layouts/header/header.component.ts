import { Component, OnInit } from '@angular/core'

import { Principal, User } from '../../shared'

@Component({
  selector: 'ae-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  currentUser: User

  constructor(private principal: Principal) {}

  ngOnInit() {
    this.principal.identity().then((user) => this.currentUser = user)
  }
}
