import { Component } from '@angular/core'

import { Principal } from '../../shared'

@Component({
  selector: 'ae-smart-button',
  templateUrl: './smart-button.component.html',
  styleUrls: ['./smart-button.component.css']
})
export class SmartButtonComponent {

  constructor(private principal: Principal) {}

  isAuth(): boolean {
    return this.principal.isAuthenticated()
  }
}
