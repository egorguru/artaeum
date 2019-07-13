import { Component, OnInit } from '@angular/core'
import { Title } from '@angular/platform-browser'
import { environment as env} from '../../../environments/environment'

import {
  Principal, SubscriptionService,
  ArticleService, User, Article
} from '../../shared'

@Component({
  selector: 'ae-last-articles',
  templateUrl: './last-articles.component.html'
})
export class LastArticlesComponent implements OnInit {

  currentUser: User
  articles: Article[] = []

  private page = 0
  private userIds: string

  constructor(
    private principal: Principal,
    private subscriptionService: SubscriptionService,
    private articleService: ArticleService,
    private title: Title
  ) {}

  ngOnInit(): void {
    this.title.setTitle('Articles from your subscriptions - Artaeum')
    this.principal.identity().then((u) => {
      if (u) {
        this.currentUser = u
        this.subscriptionService
          .query({ subscriberId: u.id })
          .subscribe((res) => {
            this.userIds = res.body.map((s) => s.profileId).join(',')
          })
      }
    })
  }

  loadArticles(): void {
    this.articleService.queryByUsers({
      page: this.page++,
      size: env.POSTS_PER_PAGE,
      users: this.userIds
    }).subscribe((res) => {
      this.articles = this.articles.concat(res.body)
    })
  }
}
