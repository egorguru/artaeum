import { Component, OnInit } from '@angular/core'
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { Router } from '@angular/router'

import { AccountService } from '../../shared'

@Component({
  selector: 'ae-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  form: FormGroup

  constructor(
    private router: Router,
    private accountService: AccountService
  ) {}

  ngOnInit() {
    this.form = new FormGroup({
      'login': new FormControl(null, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50),
        Validators.pattern('^[_\'.@A-Za-z0-9-]*$')
      ]),
      'email': new FormControl(null, [
        Validators.required,
        Validators.email,
        Validators.minLength(5),
        Validators.maxLength(100)
      ]),
      'password': new FormControl(null, [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(50)
      ]),
      'language': new FormControl(null, [
        Validators.required
      ])
    })
  }

  onSubmit() {
    const { login, email, password, langKey } = this.form.value
    this.accountService.register({
      login, email, password, langKey
    }).subscribe((res) => {
      if (res.status === 201) {
        this.router.navigate(['login'])
      }
    })
  }
}
