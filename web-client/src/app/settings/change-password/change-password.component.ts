import { Component, OnInit } from '@angular/core'
import { FormGroup, FormControl, Validators } from '@angular/forms'

import { AccountService } from '../../shared'

@Component({
  selector: 'ae-change-password',
  templateUrl: './change-password.component.html'
})
export class ChangePasswordComponent implements OnInit {

  form: FormGroup

  constructor(
    private accountService: AccountService
  ) {}

  ngOnInit() {
    this.form = new FormGroup({
      'password': new FormControl(null, [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(50)
      ])
    })
  }

  onSubmit() {
    this.accountService.changePassword(this.form.value.password)
      .subscribe(() => this.form.reset())
  }
}
