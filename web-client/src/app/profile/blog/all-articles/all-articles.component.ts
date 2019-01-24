import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { environment as env } from '../../../../environments/environment'

import {
  User, Article,
  UserService, ArticleService,
  Principal
} from '../../../shared'

@Component({
  selector: 'ae-all-articles-blog',
  templateUrl: './all-articles.component.html'
})
export class AllArticlesComponent implements OnInit {

  currentUser: User
  user: User
  articles: Article[]
  page: any
  previousPage: any
  totalItems: any
  postsPerPage: number

  constructor(
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
    this.activatedRoute.parent.parent.params
      .subscribe((params) => this.userService.get(params['login'])
        .subscribe((res) => {
          this.user = res.body
          this.loadAll()
        }))
    this.principal.identity().then((u) => this.currentUser = u)
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
      this.router.navigate(['/u', this.user.login, 'blog'], {
        queryParams: {
          page: this.page,
          size: this.postsPerPage,
          sort: ['id,desc']
        }
      })
      this.loadAll()
    }
  }
}
