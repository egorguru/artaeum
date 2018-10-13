import { Injectable } from '@angular/core'
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse
} from '@angular/common/http'
import { Observable } from 'rxjs'
import { tap } from 'rxjs/operators'
import { Router } from '@angular/router'

import { Principal, LoginService } from '../auth'

@Injectable({ providedIn: 'root' })
export class AuthExpiredInterceptor implements HttpInterceptor {

  constructor(
    private principal: Principal,
    private loginService: LoginService,
    private router: Router
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      tap(
        (event: HttpEvent<any>) => {},
        (err: any) => {
          if (err instanceof HttpErrorResponse) {
            if (err.status === 401) {
              if (this.principal.isAuthenticated()) {
                this.principal.authenticate(null)
              } else {
                this.loginService.logout()
                this.router.navigate(['/'])
              }
            }
          }
        }
      )
    )
  }
}
