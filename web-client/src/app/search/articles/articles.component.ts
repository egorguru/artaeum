import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { environment as env } from '../../../environments/environment'

import { UserService, User, Article, ArticleService, Principal } from '../../shared'

@Component({
  selector: 'ae-search-articles',
  templateUrl: './articles.component.html'
})
export class ArticlesComponent implements OnInit {

  currentUser: User
  articles: Article[]
  users = {}
  query: string
  page: any
  previousPage: any
  totalItems: any
  postsPerPage: number

  constructor(
    public userService: UserService,
    public articleService: ArticleService,
    public activatedRoute: ActivatedRoute,
    public router: Router,
    public principal: Principal
  ) {}

  ngOnInit() {
    this.postsPerPage = env.POSTS_PER_PAGE
    this.activatedRoute.data.subscribe((data) => {
      this.page = data.pagingParams.page
      this.previousPage = data.pagingParams.page
    })
    this.activatedRoute.parent.queryParams.subscribe((params) => {
      this.query = params['query']
      this.loadAll()
    })
    this.principal.identity().then((user) => this.currentUser = user)
  }

  loadAll() {
    this.articleService.search({
      page: this.page - 1,
      size: this.postsPerPage,
      sort: ['id,desc'],
      query: this.query
    }).subscribe((res) => {
      this.articles = res.body
      this.loadUsers()
      this.totalItems = res.headers.get('X-Total-Count')
    })
  }

  loadPage(page: number) {
    if (page !== this.previousPage) {
      this.previousPage = page
      this.router.navigate(['/search'], {
        queryParams: {
          page: this.page,
          size: this.postsPerPage,
          sort: ['id,desc'],
          query: this.query
        }
      })
      this.loadAll()
    }
  }

  deleteArticle(id: number) {
    this.articleService.delete(id).subscribe(() => this.articles.map((p, i) => {
      if (p._id === id) {
        this.articles.splice(i, 1)
      }
    }))
  }

  private loadUsers(): void {
    this.articles.map((s) => {
      if (!this.users[s.userId]) {
        this.userService.get(s.userId)
          .subscribe((res) => this.users[s.userId] = res.body)
      }
    })
  }
}
