import { Injectable } from '@angular/core'

import { Principal } from './principal.service'
import { AuthServerProvider } from './auth.service'

@Injectable({ providedIn: 'root' })
export class LoginService {

  constructor(private principal: Principal, private authServerProvider: AuthServerProvider) {}

  login(credentials, callback?) {
    const cb = callback || function() {}
    return new Promise((resolve, reject) => {
      this.authServerProvider.login(credentials).subscribe((data) => {
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
    this.principal.authenticate(null)
  }
}
