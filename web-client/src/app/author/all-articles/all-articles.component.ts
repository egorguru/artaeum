import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'
import { environment as env } from '../../../environments/environment'

import { CategoryService, ArticleService, Principal, User, Article } from '../../shared'

@Component({
  selector: 'ae-all-articles-author',
  templateUrl: './all-articles.component.html'
})
export class AllArticlesComponent implements OnInit {

  currentUser: User
  articles: Article[]
  categories = {}

  page: any
  previousPage: any
  totalItems: any
  postsPerPage: number

  deleteCandidate: Article

  constructor(
    private categoryService: CategoryService,
    private articleService: ArticleService,
    private principal: Principal,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.postsPerPage = env.POSTS_PER_PAGE
    this.activatedRoute.data.subscribe((data) => {
      this.page = data.pagingParams.page
      this.previousPage = data.pagingParams.page
      this.loadAll()
    })
    this.principal.identity().then((u) => this.currentUser = u)
  }

  loadAll(): void {
    this.articleService.queryMy({
      page: this.page - 1,
      size: this.postsPerPage
    }).subscribe((res) => {
      this.articles = res.body
      this.totalItems = res.headers.get('X-Total-Count')
      for (const a of res.body) {
        if (a.category) {
          this.categoryService.get(a.category).subscribe((category) => {
            this.categories[a._id] = category.body
          })
        }
      }
    })
  }

  loadPage(page: number): void {
    if (page !== this.previousPage) {
      this.previousPage = page
      this.router.navigate(['/author/articles'], {
        queryParams: {
          page: this.page,
          size: this.postsPerPage
        }
      })
      this.loadAll()
    }
  }

  modalDelete(content, article: Article): void {
    this.deleteCandidate = article
    this.modalService.open(content, { ariaLabelledBy: 'modal-delete-article' })
  }

  deleteArticle(): void {
    this.articleService.delete(this.deleteCandidate._id)
      .subscribe(() => this.loadAll())
  }
}
