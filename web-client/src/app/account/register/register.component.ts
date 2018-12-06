import { Component, OnInit } from '@angular/core'
import { Title } from '@angular/platform-browser'
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import { environment as env } from '../../../environments/environment'

import { AccountService } from '../../shared'

function validateLangKey(c: FormControl): any {
  return env.LANG_KEYS.includes(c.value) ? null : {
    validateLangKey: {
      valid: false
    }
  }
}

@Component({
  selector: 'ae-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  form: FormGroup

  constructor(
    private title: Title,
    private router: Router,
    private accountService: AccountService
  ) {}

  ngOnInit(): void {
    this.title.setTitle('Registration - Artaeum')
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
      'firstName': new FormControl(null, [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(50)
      ]),
      'lastName': new FormControl(null, [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(50)
      ]),
      'password': new FormControl(null, [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(50)
      ]),
      'langKey': new FormControl('default', validateLangKey)
    })
  }

  onSubmit(): void {
    this.form.disable()
    this.accountService.register(this.form.value).subscribe((res) => {
      if (res.status === 201) {
        this.router.navigate(['/login'])
      }
    })
  }
}
