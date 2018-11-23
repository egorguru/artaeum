import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'

@Injectable({ providedIn: 'root' })
export class PasswordResetInitService {

  constructor(private http: HttpClient) {}

  initReset(mail: string): Observable<any> {
    return this.http.post('uaa/account/reset-password/init', mail)
  }
}
