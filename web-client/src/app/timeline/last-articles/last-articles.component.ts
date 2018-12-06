import { Component, OnInit } from '@angular/core'
import { Title } from '@angular/platform-browser'
import { environment as env} from '../../../environments/environment'

import {
  Principal, SubscriptionService,
  UserService, ArticleService,
  User, Article, Subscription
} from '../../shared'

@Component({
  selector: 'ae-last-articles',
  templateUrl: './last-articles.component.html'
})
export class LastArticlesComponent implements OnInit {

  currentUser: User
  articles: Article[] = []
  users: User[] = []

  private page = 0
  private userIds: string[] = []

  constructor(
    private principal: Principal,
    private subscriptionService: SubscriptionService,
    private userService: UserService,
    private articleService: ArticleService,
    private title: Title
  ) {}

  ngOnInit(): void {
    this.title.setTitle('Articles from your subscriptions - Artaeum')
    this.principal.identity().then((u) => {
      this.currentUser = u
      this.subscriptionService.queryForAllSubscriptions(u.id)
        .subscribe((res) => this.loadUsers(res.body))
    })
  }

  loadArticles(): void {
    this.articleService.query({
      page: this.page++,
      size: env.POSTS_PER_PAGE,
      sort: ['id,desc'],
      userId: this.userIds
    }).subscribe((res) => {
      this.articles = this.articles.concat(res.body)
    })
  }

  private loadUsers(subs: Subscription[]): void {
    subs.map((s, i) => this.userService.get(s.profileId).subscribe((u) => {
      this.users[u.body.id] = u.body
      this.userIds.push(u.body.id)
      if (i === Object.keys(subs).length - 1) {
        this.loadArticles()
      }
    }))
  }
}
