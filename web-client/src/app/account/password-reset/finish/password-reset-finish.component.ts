import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'

import { PasswordResetFinishService } from './password-reset-finish.service'

@Component({
  selector: 'ae-password-reset-finish',
  templateUrl: './password-reset-finish.component.html'
})
export class PasswordResetFinishComponent implements OnInit {

  error = false
  success = false
  keyMissing: boolean
  resetAccount: any = {}
  key: string

  constructor(
    private passwordResetFinishService: PasswordResetFinishService,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.key = params['key']
    })
    this.keyMissing = !this.key
  }

  submit() {
    this.passwordResetFinishService.save({
      key: this.key,
      newPassword: this.resetAccount.password
    }).subscribe(
      () => this.success = true,
      () => this.error = true
    )
  }
}
