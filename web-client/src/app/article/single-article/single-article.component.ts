import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { Title } from '@angular/platform-browser'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'

import {
  User, Article,
  ArticleService, UserService,
  SmartButtonService, Principal,
  CategoryService, Category
} from '../../shared'

@Component({
  selector: 'ae-single-article',
  templateUrl: './single-article.component.html',
  styleUrls: ['./single-article.component.css']
})
export class SingleArticleComponent implements OnInit {

  article: Article
  category: Category
  author: User
  currentUser: User

  constructor(
    private principal: Principal,
    private smartButtonService: SmartButtonService,
    private articleService: ArticleService,
    private categoryService: CategoryService,
    private userService: UserService,
    private activedRoute: ActivatedRoute,
    private router: Router,
    private title: Title,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.activedRoute.params.subscribe((params) => {
      this.articleService.get(params['id']).subscribe((res) => {
        this.article = res.body
        this.title.setTitle(`${res.body.title} - Artaeum`)
        this.checkUserAndInitSmartButton()
        this.userService.get(this.article.userId)
          .subscribe((author) => this.author = author.body)
        this.categoryService.get(this.article.category)
          .subscribe((category) => this.category = category.body)
      }, () => this.router.navigate(['/404']))
    })
  }

  modal(content): void {
    this.modalService.open(content, { ariaLabelledBy: 'modal-delete-article' })
  }

  deleteArticle(): void {
    this.modalService.dismissAll('Remove article')
    this.articleService.delete(this.article._id)
      .subscribe(() => this.router.navigate(['/']))
  }

  private checkUserAndInitSmartButton(): void {
    this.principal.identity().then((u) => {
      this.currentUser = u
      if (u && this.article.userId === u.id) {
        this.smartButtonService.add({
          className: 'fa fa-edit',
          link: 'author/articles/' + this.article._id,
          title: 'Edit'
        })
      }
    })
  }
}
