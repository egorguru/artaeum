import { Component, OnInit } from '@angular/core'

import { SubscriptionService, ArticleService, PostService, LikeService, Principal } from '../../shared'

@Component({
  selector: 'ae-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  subsCount: number
  articlesCount: number
  postsCount: number
  likesCount: number

  constructor(
    private principal: Principal,
    private subscriptionService: SubscriptionService,
    private articleService: ArticleService,
    private postService: PostService,
    private likeService: LikeService
  ) {}

  ngOnInit(): void {
    this.principal.identity().then((u) => {
      this.subscriptionService.queryForAllSubscribers(u.id)
        .subscribe((res) => this.subsCount = this.getCount(res))
      this.articleService.queryMy({ userId: u.id })
        .subscribe((res) => this.articlesCount = this.getCount(res))
      this.postService.query({ userId: u.id })
        .subscribe((res) => this.postsCount = this.getCount(res))
      this.likeService.getAllForUser(u.id)
        .subscribe((res) => this.likesCount = this.getCount(res))
    })
  }

  private getCount(param: { body: any[] }): number {
    return Object.keys(param.body).length || 0
  }
}
