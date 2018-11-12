import { Component } from '@angular/core'
import { Router, NavigationEnd } from '@angular/router'

import { Principal, SmartButtonService, User } from '../../shared'

@Component({
  selector: 'ae-smart-button',
  templateUrl: './smart-button.component.html',
  styleUrls: ['./smart-button.component.css']
})
export class SmartButtonComponent {

  currentUser: User
  isOpen = false
  extraElements: any[]

  constructor(
    private principal: Principal,
    private smartButtonService: SmartButtonService,
    private router: Router
  ) {
    this.principal.identity().then((u) => this.currentUser = u)
    router.events.subscribe((v) => {
      if (v instanceof NavigationEnd) {
        this.extraElements = this.smartButtonService.get()
      }
    })
  }

  reverseIsOpen(): void {
    this.isOpen = !this.isOpen
  }
}
