import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'

@Injectable({ providedIn: 'root' })
export class AuthServerProvider {

  constructor(private http: HttpClient) {}

  login(credentials): Observable<any> {
    return this.http.post('login', {
      username: credentials.username,
      password: credentials.password,
      rememberMe: credentials.rememberMe
    })
  }
}
