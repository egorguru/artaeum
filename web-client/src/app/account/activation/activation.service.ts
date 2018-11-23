import { Injectable } from '@angular/core'
import { HttpClient, HttpParams } from '@angular/common/http'
import { Observable } from 'rxjs'

@Injectable({ providedIn: 'root' })
export class ActivationService {

  constructor(private http: HttpClient) {}

  activate(key: string): Observable<any> {
    return this.http.get('uaa/activate', {
      params: new HttpParams().set('key', key)
    })
  }
}
