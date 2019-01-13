import { Injectable } from '@angular/core'
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router'

import { Principal } from './principal.service'

@Injectable({ providedIn: 'root' })
export class UserRouteAccessService implements CanActivate {

  constructor(private router: Router, private principal: Principal) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    const authorities = route.data['authorities']
    return Promise.resolve(
      this.principal.identity().then((u) => {
        if (!authorities || authorities.length === 0) {
          return true
        }
        if (u) {
          return this.principal.hasAuthorities(authorities)
        }
        this.router.navigate(['/login'])
        return false
      })
    )
  }
}
