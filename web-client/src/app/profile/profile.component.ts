import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { Title } from '@angular/platform-browser'

import { User, Subscription, UserService, SubscriptionService, Principal, SmartButtonService } from '../shared'

@Component({
  selector: 'ae-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  currentUser: User
  user: User
  subscription: Subscription

  constructor(
    private smartButtonService: SmartButtonService,
    private principal: Principal,
    private userService: UserService,
    private subscriptionService: SubscriptionService,
    private activedRoute: ActivatedRoute,
    private router: Router,
    private title: Title
  ) {}

  ngOnInit(): void {
    this.smartButtonService.add({
      className: 'fa fa-tachometer',
      link: 'author',
      title: 'Dashboard'
    })
    this.activedRoute.params.subscribe((params) => {
      this.userService.get(params['login']).subscribe((res) => {
        this.user = res.body
        this.title.setTitle(`@${res.body.login} - Artaeum`)
        this.principal.identity().then((u) => {
          this.currentUser = u
          if (u && this.user.id !== u.id) {
            this.loadSubscription()
          }
        })
      }, () => this.router.navigate(['/404']))
    })
  }

  subscribe(): void {
    this.subscriptionService.subscribe(this.user.id)
      .subscribe(() => this.loadSubscription())
  }

  unsubscribe(): void {
    this.subscriptionService.unsubscribe(this.user.id)
      .subscribe(() => this.loadSubscription())
  }

  private loadSubscription(): void {
    if (this.currentUser) {
      this.subscriptionService.get(this.user.id)
        .subscribe((res) => this.subscription = res.body)
    }
  }
}
