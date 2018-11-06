import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { environment as env } from '../../../environments/environment'

import { UserService, User, Article, ArticleService, Principal } from '../../shared'

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
    public userService: UserService,
    public articleService: ArticleService,
    public principal: Principal,
    public activatedRoute: ActivatedRoute,
    public router: Router
  ) {}

  ngOnInit() {
    this.postsPerPage = env.POSTS_PER_PAGE
    this.activatedRoute.data.subscribe((data) => {
      this.page = data.pagingParams.page
      this.previousPage = data.pagingParams.page
    })
    this.activatedRoute.parent.params
      .subscribe((params) => this.userService.get(params['login'])
        .subscribe((res) => {
          this.user = res.body
          this.loadAll()
        }))
    this.principal.identity().then((user) => this.currentUser = user)
  }

  loadAll() {
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

  loadPage(page: number) {
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

  deletePost(id: number): void {
    this.articleService.delete(id).subscribe(() => this.loadAll())
  }
}
