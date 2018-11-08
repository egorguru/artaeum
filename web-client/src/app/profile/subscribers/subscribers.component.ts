import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'

import { UserService, User, SubscriptionService, Subscription } from '../../shared'

@Component({
  selector: 'ae-subscribers',
  templateUrl: './subscribers.component.html'
})
export class SubscribersComponent implements OnInit {

  currentUser: User
  user: User
  subscriptions: Subscription[]
  subscribers = {}
  page: any
  previousPage: any
  totalItems: any
  postsPerPage: number

  constructor(
    public userService: UserService,
    public subscriptionService: SubscriptionService,
    public activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.activatedRoute.parent.params.subscribe((params) => {
      this.subscriptionService.queryForAllSubscribers(params['login'])
        .subscribe((res) => this.loadUsers(res.body))
    })
  }

  private loadUsers(subs: Subscription[]): void {
    this.subscriptions = subs
    subs.map((s) => this.userService.get(s.subscriberId)
      .subscribe((res) => this.subscribers[s.subscriberId] = res.body))
  }
}
