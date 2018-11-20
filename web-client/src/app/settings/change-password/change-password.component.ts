import { Component, OnInit } from '@angular/core'
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { Title } from '@angular/platform-browser'

import { AccountService } from '../../shared'

@Component({
  selector: 'ae-change-password',
  templateUrl: './change-password.component.html'
})
export class ChangePasswordComponent implements OnInit {

  form: FormGroup

  constructor(
    private accountService: AccountService,
    private title: Title
  ) {}

  ngOnInit(): void {
    this.title.setTitle('Change password - Artaeum')
    this.form = new FormGroup({
      'password': new FormControl(null, [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(50)
      ])
    })
  }

  onSubmit(): void {
    this.accountService.changePassword(this.form.value.password)
      .subscribe(() => this.form.reset())
  }
}
