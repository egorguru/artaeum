import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'

import { Principal, User } from '../../shared'

@Component({
  selector: 'ae-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  currentUser: User
  searchQuery: string
  isShowSearch = false

  constructor(
    private router: Router,
    private principal: Principal
  ) {}

  ngOnInit() {
    this.principal.identity().then((user) => this.currentUser = user)
  }

  reverseIsShowSearch(): void {
    this.isShowSearch = !this.isShowSearch
  }

  search(): void {
    this.reverseIsShowSearch()
    this.router.navigate(['/search'], { queryParams: { query: this.searchQuery } })
  }
}
