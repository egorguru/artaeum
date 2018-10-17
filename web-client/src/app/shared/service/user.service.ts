import { Injectable } from '@angular/core'
import { HttpClient, HttpResponse } from '@angular/common/http'
import { Observable } from 'rxjs'

import { User } from '../model'
import { createRequestOption } from './pagination'

@Injectable({ providedIn: 'root' })
export class UserService {

  constructor(private http: HttpClient) {}

  get(param: string | number): Observable<HttpResponse<User>> {
    return this.http.get<User>(`uaa/users/${param}`, { observe: 'response' })
  }

  query(req?: any): Observable<HttpResponse<User[]>> {
    return this.http.get<User[]>('uaa/users', {
      params: createRequestOption(req),
      observe: 'response'
    })
  }

  update(user: User): Observable<HttpResponse<User>> {
    return this.http.put<User>('uaa/users', user, { observe: 'response' })
  }

  delete(login: string): Observable<HttpResponse<any>> {
    return this.http.delete(`uaa/users/${login}`, { observe: 'response' })
  }
}
