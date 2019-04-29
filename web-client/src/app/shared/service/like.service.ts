import { Injectable } from '@angular/core'
import { HttpClient, HttpResponse, HttpParams } from '@angular/common/http'
import { Observable } from 'rxjs'

import { Like } from '../model'

@Injectable({ providedIn: 'root' })
export class LikeService {

  constructor(private http: HttpClient) {}

  saveOrRemove(resourceType: String, resourceId: number): Observable<HttpResponse<any>> {
    return this.http.post(
      `media/likes`,
      { resourceType, resourceId },
      { observe: 'response' }
    )
  }

  getAllForResource(resourceType: string, resourceId: number): Observable<HttpResponse<Like[]>> {
    return this.http.get<Like[]>(
      `media/likes`,
      {
        observe: 'response',
        params: new HttpParams()
          .append('resourceType', resourceType)
          .append('resourceId', resourceId.toString())
      }
    )
  }

  getAllForUser(userId: string): Observable<HttpResponse<Like[]>> {
    return this.http.get<Like[]>(`media/likes`, {
      observe: 'response',
      params: new HttpParams().append('userId', userId)
    })
  }
}
