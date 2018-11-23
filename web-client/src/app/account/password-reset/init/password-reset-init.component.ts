import { Component } from '@angular/core'

import { PasswordResetInitService } from './password-reset-init.service'

@Component({
  selector: 'ae-password-reset-init',
  templateUrl: './password-reset-init.component.html'
})
export class PasswordResetInitComponent {

  error = false
  success = false
  resetAccount: any = {}

  constructor(private passwordResetInitService: PasswordResetInitService) {}

  submit() {
    this.passwordResetInitService.initReset(this.resetAccount.email).subscribe(
      () => this.success = true,
      () => this.error = true
    )
  }
}
