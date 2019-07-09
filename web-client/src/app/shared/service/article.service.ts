import { Injectable } from '@angular/core'
import { HttpClient, HttpResponse } from '@angular/common/http'
import { Observable } from 'rxjs'

import { Article } from '../model'
import { createRequestOption } from './pagination'

@Injectable({ providedIn: 'root' })
export class ArticleService {

  constructor(private http: HttpClient) {}

  create(article: Article): Observable<HttpResponse<Article>> {
    return this.http.post<Article>('blog/articles', article, { observe: 'response' })
  }

  update(article: Article): Observable<HttpResponse<Article>> {
    return this.http.put<Article>('blog/articles', article, { observe: 'response' })
  }

  publish(article: Article): Observable<HttpResponse<Article>> {
    return this.http.put<Article>('blog/articles/publish', article, { observe: 'response' })
  }

  changeStatus(article: Article): Observable<HttpResponse<Article>> {
    return this.http.put<Article>('blog/articles/status', article, { observe: 'response' })
  }

  get(id: number): Observable<HttpResponse<Article>> {
    return this.http.get<Article>(`blog/articles/${id}`, { observe: 'response' })
  }

  getMy(id: number): Observable<HttpResponse<Article>> {
    return this.http.get<Article>(`blog/articles/my/${id}`, { observe: 'response' })
  }

  query(req?: any): Observable<HttpResponse<Article[]>> {
    return this.http.get<Article[]>('blog/articles', {
      params: createRequestOption(req),
      observe: 'response'
    })
  }

  queryByUsers(req?: any): Observable<HttpResponse<Article[]>> {
    return this.http.get<Article[]>('blog/articles/by-users', {
      params: createRequestOption(req),
      observe: 'response'
    })
  }

  queryMy(req?: any): Observable<HttpResponse<Article[]>> {
    return this.http.get<Article[]>('blog/articles/my', {
      params: createRequestOption(req),
      observe: 'response'
    })
  }

  search(req?: any): Observable<HttpResponse<Article[]>> {
    return this.http.get<Article[]>('blog/articles/search', {
      params: createRequestOption(req),
      observe: 'response'
    })
  }

  delete(id: string): Observable<HttpResponse<any>> {
    return this.http.delete(`blog/articles/${id}`, { observe: 'response' })
  }
}
