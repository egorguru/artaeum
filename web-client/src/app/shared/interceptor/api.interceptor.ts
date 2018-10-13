import { Injectable } from '@angular/core'
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http'
import { Observable } from 'rxjs'

import { environment as env } from '../../../environments/environment'

@Injectable({ providedIn: 'root' })
export class APIInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(
      req.clone({
        url: `${env.SERVER_API_URL}/${req.url}`
      })
    )
  }
}
