import { Injectable } from '@angular/core'
import { HttpClient, HttpResponse } from '@angular/common/http'
import { Observable } from 'rxjs'

import { User } from '../model'

@Injectable({ providedIn: 'root' })
export class AccountService {

  constructor(private http: HttpClient) {}

  get(): Observable<HttpResponse<User>> {
    return this.http.get<User>('uaa/account', { observe: 'response' })
  }

  save(user: any): Observable<HttpResponse<any>> {
    return this.http.post('uaa/account', user, { observe: 'response' })
  }
}
