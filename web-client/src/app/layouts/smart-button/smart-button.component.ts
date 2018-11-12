import { Component } from '@angular/core'
import { Router, NavigationEnd } from '@angular/router'

import { Principal, SmartButtonService } from '../../shared'

@Component({
  selector: 'ae-smart-button',
  templateUrl: './smart-button.component.html',
  styleUrls: ['./smart-button.component.css']
})
export class SmartButtonComponent {

  isOpen = false
  extraElements: any[]

  constructor(
    private principal: Principal,
    private smartButtonService: SmartButtonService,
    private router: Router
  ) {
    router.events.subscribe((v) => {
      if (v instanceof NavigationEnd) {
        this.extraElements = this.smartButtonService.get()
      }
    })
  }

  isAuth(): boolean {
    return this.principal.isAuthenticated()
  }

  reverseIsOpen(): void {
    this.isOpen = !this.isOpen
  }
}
