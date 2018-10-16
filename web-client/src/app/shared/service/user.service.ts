import { Injectable } from '@angular/core'
import { HttpClient, HttpResponse } from '@angular/common/http'
import { Observable } from 'rxjs'

import { User } from '../model'

@Injectable({ providedIn: 'root' })
export class UserService {

  constructor(private http: HttpClient) {}

  get(param: string | number): Observable<HttpResponse<User>> {
    return this.http.get<User>(`uaa/users/${param}`, { observe: 'response' })
  }
}
