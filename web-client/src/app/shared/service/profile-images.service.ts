import { Injectable } from '@angular/core'
import { HttpClient, HttpResponse } from '@angular/common/http'
import { Observable } from 'rxjs'

@Injectable({ providedIn: 'root' })
export class ProfileImagesService {

  constructor(private http: HttpClient) {}

  changeAvatar(image: string): Observable<HttpResponse<any>> {
    const body = new FormData()
    body.set('image', image)
    return this.http.post('profile/images/avatar', body, { observe: 'response' })
  }

  changeBackground(image: string): Observable<HttpResponse<any>> {
    const body = new FormData()
    body.set('image', image)
    return this.http.post('profile/images/background', body, { observe: 'response' })
  }
}
