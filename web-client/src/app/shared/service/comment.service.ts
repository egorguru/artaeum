import { Injectable } from '@angular/core'
import { HttpClient, HttpResponse, HttpParams } from '@angular/common/http'
import { Observable } from 'rxjs'

import { Comment } from '../model'

@Injectable({ providedIn: 'root' })
export class CommentService {

  constructor(private http: HttpClient) {}

  create(comment: Comment): Observable<HttpResponse<any>> {
    return this.http.post('media/comments', comment, { observe: 'response' })
  }

  update(comment: Comment): Observable<HttpResponse<Comment>> {
    return this.http.put<Comment>('media/comments', comment, { observe: 'response' })
  }

  query(resourceType: string, resourceId: string): Observable<HttpResponse<Comment[]>> {
    return this.http.get<Comment[]>(`media/comments`, {
      observe: 'response',
      params: new HttpParams()
        .append('resourceType', resourceType)
        .append('resourceId', resourceId.toString())
    })
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete(`media/comments/${id}`, { observe: 'response' })
  }
}
