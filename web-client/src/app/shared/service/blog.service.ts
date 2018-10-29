import { Injectable } from '@angular/core'
import { HttpClient, HttpResponse } from '@angular/common/http'
import { Observable } from 'rxjs'

import { BlogPost } from '../model'
import { createRequestOption } from './pagination'

@Injectable({ providedIn: 'root' })
export class BlogService {

  constructor(private http: HttpClient) {}

  create(blogPost: BlogPost): Observable<HttpResponse<BlogPost>> {
    return this.http.post<BlogPost>('blog/blogs', blogPost, { observe: 'response' })
  }

  update(blogPost: BlogPost): Observable<HttpResponse<BlogPost>> {
    return this.http.put<BlogPost>('blog/blogs', blogPost, { observe: 'response' })
  }

  get(id: number): Observable<HttpResponse<BlogPost>> {
    return this.http.get<BlogPost>(`blog/blogs/${id}`, { observe: 'response' })
  }

  query(req?: any): Observable<HttpResponse<BlogPost[]>> {
    return this.http.get<BlogPost[]>('blog/blogs', {
      params: createRequestOption(req),
      observe: 'response'
    })
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete(`blog/blogs/${id}`, { observe: 'response' })
  }
}
