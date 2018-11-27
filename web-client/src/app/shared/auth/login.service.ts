import { Injectable } from '@angular/core'

import { Principal } from './principal.service'
import { AuthServerProvider } from './auth.service'

@Injectable({ providedIn: 'root' })
export class LoginService {

  constructor(
    private principal: Principal,
    private authServerProvider: AuthServerProvider
  ) {}

  login(credentials): Promise<any> {
    return new Promise((resolve, reject) => {
      this.authServerProvider.login(credentials).subscribe((data) => {
        window.localStorage.setItem('access_token', data.access_token)
        this.principal.identity().then((account) => resolve(data))
      }, (err) => {
        this.logout()
        reject(err)
      })
    })
  }

  logout(): void {
    window.localStorage.removeItem('access_token')
    this.principal.authenticate(null)
  }
}
