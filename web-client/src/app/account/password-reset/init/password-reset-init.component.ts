import { Component, OnInit } from '@angular/core'
import { Title } from '@angular/platform-browser'

import { PasswordResetInitService } from './password-reset-init.service'

@Component({
  selector: 'ae-password-reset-init',
  templateUrl: './password-reset-init.component.html'
})
export class PasswordResetInitComponent implements OnInit {

  error = false
  success = false
  resetAccount: any = {}

  constructor(
    private title: Title,
    private passwordResetInitService: PasswordResetInitService
  ) {}

  ngOnInit() {
    this.title.setTitle('Password reset - Artaeum')
  }

  submit() {
    this.passwordResetInitService.initReset(this.resetAccount.email).subscribe(
      () => this.success = true,
      () => this.error = true
    )
  }
}
