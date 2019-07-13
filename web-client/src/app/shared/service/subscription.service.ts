import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { HttpClient, HttpResponse } from '@angular/common/http'

import { Subscription } from '../model'
import { createRequestOption } from './pagination'

@Injectable({ providedIn: 'root' })
export class SubscriptionService {

  constructor(private http: HttpClient) {}

  subscribe(profileId: string): Observable<HttpResponse<any>> {
    return this.http.post('profile/subscriptions/subscribe', profileId, { observe: 'response' })
  }

  unsubscribe(profileId: string): Observable<HttpResponse<any>> {
    return this.http.post('profile/subscriptions/unsubscribe', profileId, { observe: 'response' })
  }

  query(req: any): Observable<HttpResponse<Subscription[]>> {
    return this.http.get<Subscription[]>('profile/subscriptions', {
      params: createRequestOption(req),
      observe: 'response'
    })
  }
}
