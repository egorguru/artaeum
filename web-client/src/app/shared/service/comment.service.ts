import { Injectable } from '@angular/core'
import { HttpClient, HttpResponse } from '@angular/common/http'
import { Observable } from 'rxjs'

import { Comment } from '../model'
import { createRequestOption } from './pagination'

@Injectable({ providedIn: 'root' })
export class CommentService {

  constructor(private http: HttpClient) {}

  create(comment: Comment): Observable<HttpResponse<any>> {
    return this.http.post('comment/comments', comment, { observe: 'response' })
  }

  update(comment: Comment): Observable<HttpResponse<Comment>> {
    return this.http.put<Comment>('comment/comments', comment, { observe: 'response' })
  }

  query(resourceType: string, resourceId: number, req?: any): Observable<HttpResponse<Comment[]>> {
    return this.http.get<Comment[]>(`comment/comments/${resourceType}/${resourceId}`, {
      params: createRequestOption(req), // incompatible with server
      observe: 'response'
    })
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete(`comment/comments/${id}`, { observe: 'response' })
  }
}
