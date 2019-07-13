import { Injectable } from '@angular/core'
import { HttpClient, HttpResponse } from '@angular/common/http'
import { Observable } from 'rxjs'

import { Post } from '../model'
import { createRequestOption } from './pagination'

@Injectable({ providedIn: 'root' })
export class PostService {

  constructor(private http: HttpClient) {}

  create(post: Post): Observable<HttpResponse<any>> {
    return this.http.post('profile/posts', post, { observe: 'response' })
  }

  get(id: number): Observable<HttpResponse<Post>> {
    return this.http.get<Post>(`profile/posts/${id}`, { observe: 'response' })
  }

  query(req?: any): Observable<HttpResponse<Post[]>> {
    return this.http.get<Post[]>('profile/posts', {
      params: createRequestOption(req),
      observe: 'response'
    })
  }

  search(req?: any): Observable<HttpResponse<Post[]>> {
    return this.http.get<Post[]>('profile/posts/search', {
      params: createRequestOption(req),
      observe: 'response'
    })
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete(`profile/posts/${id}`, { observe: 'response' })
  }
}
