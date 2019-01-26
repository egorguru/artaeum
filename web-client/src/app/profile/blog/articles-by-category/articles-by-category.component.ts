import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { environment as env } from '../../../../environments/environment'

import {
  User, Article,
  UserService, ArticleService,
  Principal, Category,
  CategoryService
} from '../../../shared'

@Component({
  selector: 'ae-articles-by-category',
  templateUrl: './articles-by-category.component.html'
})
export class ArticlesByCategoryComponent implements OnInit {

  currentUser: User
  user: User
  category: Category
  articles: Article[]
  page: any
  previousPage: any
  totalItems: any
  postsPerPage: number

  constructor(
    private userService: UserService,
    private articleService: ArticleService,
    private categoryService: CategoryService,
    private principal: Principal,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.postsPerPage = env.POSTS_PER_PAGE
    this.activatedRoute.data.subscribe((data) => {
      this.page = data.pagingParams.page
      this.previousPage = data.pagingParams.page
    })
    this.principal.identity().then((u) => {
      this.currentUser = u
      this.categoryService.getAll(u.id).subscribe((res) => {
        this.activatedRoute.params.subscribe((params) => {
          this.category = res.body.find((c) => c.name === params['category'])
          this.activatedRoute.parent.parent.params.subscribe((parentParams) => {
            this.userService.get(parentParams['login']).subscribe((user) => {
              this.user = user.body
              this.loadAll()
            })
          })
        })
      })
    })
  }

  loadAll(): void {
    this.articleService.query({
      page: this.page - 1,
      size: this.postsPerPage,
      sort: ['id,desc'],
      category: this.category._id
    }).subscribe((res) => {
      this.articles = res.body
      this.totalItems = res.headers.get('X-Total-Count')
    })
  }

  loadPage(page: number): void {
    if (page !== this.previousPage) {
      this.previousPage = page
      this.router.navigate(['/u', this.user.login, 'blog', this.category.name], {
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
