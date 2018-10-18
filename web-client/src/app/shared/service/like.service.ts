import { Injectable } from '@angular/core'
import { HttpClient, HttpResponse } from '@angular/common/http'
import { Observable } from 'rxjs'

import { Like } from '../model'

@Injectable({ providedIn: 'root' })
export class LikeService {

  constructor(private http: HttpClient) {}

  saveOrRemove(resourceType: String, resourceId: number): Observable<HttpResponse<any>> {
    return this.http.post(
      `media/${resourceType}/${resourceId}/likes`,
      {},
      { observe: 'response' }
    )
  }

  getAllForResource(resourceType: String, resourceId: number): Observable<HttpResponse<Like[]>> {
    return this.http.get<Like[]>(
      `media/${resourceType}/${resourceId}/likes`,
      { observe: 'response' }
    )
  }

  getAllForUser(userId: string): Observable<HttpResponse<Like[]>> {
    return this.http.get<Like[]>(`media/${userId}/likes`, { observe: 'response' })
  }
}
