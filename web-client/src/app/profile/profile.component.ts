import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { Title } from '@angular/platform-browser'

import { User, Subscription, UserService, SubscriptionService, Principal } from '../shared'

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
    private principal: Principal,
    private userService: UserService,
    private subscriptionService: SubscriptionService,
    private activedRoute: ActivatedRoute,
    private router: Router,
    private title: Title
  ) {}

  ngOnInit() {
    this.principal.identity().then((u) => this.currentUser = u)
    this.activedRoute.params.subscribe((params) => {
      this.userService.get(params['login']).subscribe((res) => {
        this.user = res.body
        this.title.setTitle(`${res.body.login} - Artaeum`)
        this.loadSubscription()
      }, () => this.router.navigate(['/404']))
    })
  }

  subscribe(): void {
    this.subscriptionService.subscribe(this.user.id)
      .subscribe(this.loadSubscription)
  }

  unsubscribe(): void {
    this.subscriptionService.unsubscribe(this.user.id)
      .subscribe(this.loadSubscription)
  }

  private loadSubscription(): void {
    this.subscriptionService.get(this.user.id)
      .subscribe((res) => this.subscription = res.body)
  }
}
