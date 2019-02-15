import { Injectable } from '@angular/core'
import { HttpClient, HttpBackend } from '@angular/common/http'
import { Router, NavigationEnd } from '@angular/router'

@Injectable({ providedIn: 'root' })
export class StatisticsService {

  ip: string

  constructor(
    private http: HttpClient,
    private router: Router,
    private httpBackend: HttpBackend
  ) {}

  init(): void {
    this.router.events.subscribe((v) => {
      if (v instanceof NavigationEnd) {
        if (!this.ip) {
          this.loadIp().subscribe((res) => {
            this.ip = res.ip
            this.sendStats()
          })
        } else {
          this.sendStats()
        }
      }
    })
  }

  private loadIp() {
    const clearHttpClient = new HttpClient(this.httpBackend)
    return clearHttpClient.get<{ ip: string }>('https://api.ipify.org?format=json')
  }

  private sendStats(): void {
    if (typeof (location) !== 'undefined') {
      this.http.post('statistics/stats', {
        ip: this.ip,
        url: location.href
      }).subscribe()
    }
  }
}
