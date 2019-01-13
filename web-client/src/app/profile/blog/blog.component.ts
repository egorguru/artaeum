import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { environment as env } from '../../../environments/environment'

import {
  User, Article,
  UserService, ArticleService,
  Principal, SmartButtonService
} from '../../shared'

@Component({
  selector: 'ae-blog',
  templateUrl: './blog.component.html'
})
export class BlogComponent implements OnInit {

  currentUser: User
  user: User
  articles: Article[]
  page: any
  previousPage: any
  totalItems: any
  postsPerPage: number

  constructor(
    private smartButtonService: SmartButtonService,
    private userService: UserService,
    private articleService: ArticleService,
    private principal: Principal,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.postsPerPage = env.POSTS_PER_PAGE
    this.activatedRoute.data.subscribe((data) => {
      this.page = data.pagingParams.page
      this.previousPage = data.pagingParams.page
    })
    this.activatedRoute.parent.params
      .subscribe((params) => this.userService.get(params['login'])
        .subscribe((res) => {
          this.user = res.body
          this.identityUserAndInitSmartButton(params['login'])
          this.loadAll()
        }))
  }

  loadAll(): void {
    this.articleService.query({
      page: this.page - 1,
      size: this.postsPerPage,
      sort: ['id,desc'],
      userId: this.user.id
    }).subscribe((res) => {
      this.articles = res.body
      this.totalItems = res.headers.get('X-Total-Count')
    })
  }

  loadPage(page: number): void {
    if (page !== this.previousPage) {
      this.previousPage = page
      this.router.navigate(['/u', this.user.login], {
        queryParams: {
          page: this.page,
          size: this.postsPerPage,
          sort: ['id,desc']
        }
      })
      this.loadAll()
    }
  }

  private identityUserAndInitSmartButton(profileId: string): void {
    this.principal.identity().then((u) => {
      this.currentUser = u
      if (u && profileId === u.login) {
        this.smartButtonService.add({
          className: 'fa fa-pencil',
          link: 'author/articles',
          title: 'Create article'
        })
      }
    })
  }
}
