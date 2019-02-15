import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Router, NavigationEnd } from '@angular/router'

@Injectable({ providedIn: 'root' })
export class StatisticsService {

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  init(): void {
    if (typeof (location) !== 'undefined') {
      this.router.events.subscribe((v) => {
        if (v instanceof NavigationEnd) {
          this.http.post('statistics/stats', {
            url: location.href
          }).subscribe()
        }
      })
    }
  }
}
