import { Injectable } from '@angular/core'
import { HttpClient, HttpResponse } from '@angular/common/http'
import { Observable } from 'rxjs'

import { Category } from '../model'

@Injectable({ providedIn: 'root' })
export class CategoryService {

  constructor(private http: HttpClient) {}

  create(category: Category): Observable<HttpResponse<Category>> {
    return this.http.post<Category>('blog/categories', category, { observe: 'response' })
  }

  update(category: Category): Observable<HttpResponse<Category>> {
    return this.http.put<Category>('blog/categories', category, { observe: 'response' })
  }

  get(id: string): Observable<HttpResponse<Category>> {
    return this.http.get<Category>(`blog/categories/${id}`, { observe: 'response' })
  }

  getAll(userId: string): Observable<HttpResponse<Category[]>> {
    return this.http.get<Category[]>('blog/categories', { params: { userId }, observe: 'response' })
  }

  delete(id: string): Observable<HttpResponse<any>> {
    return this.http.delete(`blog/categories/${id}`, { observe: 'response' })
  }
}
