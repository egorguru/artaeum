import { Injectable, OnInit } from '@angular/core'
import { BehaviorSubject } from 'rxjs'

import { Principal } from './principal.service'
import { AuthServerProvider } from './auth.service'

@Injectable({ providedIn: 'root' })
export class LoginService implements OnInit {

  public readonly isUserLoggedIn = new BehaviorSubject<boolean>(false)

  constructor(
    private principal: Principal,
    private authServerProvider: AuthServerProvider
  ) {}

  ngOnInit() {
    if (this.principal.isAuthenticated()) {
      this.isUserLoggedIn.next(true)
    }
  }

  login(credentials, callback?) {
    const cb = callback || function() {}
    return new Promise((resolve, reject) => {
      this.authServerProvider.login(credentials).subscribe((data) => {
        window.localStorage.setItem('access_token', data.access_token)
        this.isUserLoggedIn.next(true)
        this.principal.identity().then((account) => {
          resolve(data)
        })
        return cb()
      }, (err) => {
        this.logout()
        reject(err)
        return cb(err)
      })
    })
  }

  logout() {
    this.isUserLoggedIn.next(false)
    window.localStorage.removeItem('access_token')
    this.principal.authenticate(null)
  }
}
