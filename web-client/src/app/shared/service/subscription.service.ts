import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { HttpClient, HttpResponse, HttpParams } from '@angular/common/http'

import { Subscription } from '../model'

@Injectable({ providedIn: 'root' })
export class SubscriptionService {

  constructor(private http: HttpClient) {}

  subscribe(profileId: string): Observable<HttpResponse<any>> {
    return this.http.post('profile/subscriptions/subscribe', profileId, { observe: 'response' })
  }

  unsubscribe(profileId: string): Observable<HttpResponse<any>> {
    return this.http.post('profile/subscriptions/unsubscribe', profileId, { observe: 'response' })
  }

  get(profileId: string): Observable<HttpResponse<Subscription>> {
    return this.http.get<Subscription>(
      `profile/subscriptions/my`,
      {
        observe: 'response',
        params: new HttpParams().append('profileId', profileId)
      }
    )
  }

  queryForAllSubscriptions(profileId: string): Observable<HttpResponse<Subscription[]>> {
    return this.query('subscriptions', profileId)
  }

  queryForAllSubscribers(profileId: string): Observable<HttpResponse<Subscription[]>> {
    return this.query('subscribers', profileId)
  }

  private query(dist: string, profileId: string): Observable<HttpResponse<Subscription[]>> {
    return this.http.get<Subscription[]>(`profile/subscriptions/${dist}`, {
      observe: 'response',
      params: new HttpParams().append('profileId', profileId)
    })
  }
}
