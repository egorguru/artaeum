import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'

@Injectable({ providedIn: 'root' })
export class PasswordResetFinishService {

  constructor(private http: HttpClient) {}

  save(keyAndPassword: any): Observable<any> {
    return this.http.post('uaa/account/reset-password/finish', keyAndPassword)
  }
}
