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
          if (err instanceof HttpErrorResponse &&
                (this.principal.isAuthenticated() ||
                  err.error.error === 'invalid_token') &&
                err.status === 401) {
            this.loginService.logout()
            this.router.navigateByUrl('/crutch', { skipLocationChange: true })
              .then(() => this.router.navigate(['/']))
          }
        }
      )
    )
  }
}
