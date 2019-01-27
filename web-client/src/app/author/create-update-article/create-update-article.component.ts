import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { HttpResponse } from '@angular/common/http'
import { Observable } from 'rxjs'
import { environment as env} from '../../../environments/environment'

import { ArticleService, Principal, Article, CategoryService, Category } from '../../shared'

@Component({
  selector: 'ae-create-update-article',
  templateUrl: './create-update-article.component.html'
})
export class CreateUpdateArticleComponent implements OnInit {

  article: Article
  categories: Category[]
  toolbar: any

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private articleService: ArticleService,
    private categoryService: CategoryService,
    private principal: Principal
  ) {}

  ngOnInit(): void {
    this.toolbar = env.QUILL_TOOLBAR
    this.route.params.subscribe((params) => {
      this.principal.identity().then((u) => {
        if (params['id']) {
          this.articleService.getMy(params['id']).subscribe((res) => {
            if (u.id !== res.body.userId) {
              this.router.navigate(['/'])
            } else {
              this.article = res.body
            }
          })
        } else {
          this.article = new Article()
        }
        this.categoryService.getAll(u.id)
          .subscribe((res) => this.categories = res.body)
      })
    })
  }

  setImage(image: string): void {
    this.article.image = image
  }

  onSave(): void {
    this.save().subscribe((res) => {
      if (res.body.isPublished) {
        this.router.navigate(['/articles', res.body._id])
      } else {
        this.router.navigate(['/author/articles', res.body._id])
      }
    })
  }

  onSaveAndPublish(): void {
    this.save().subscribe(() => {
      this.articleService.publish({ _id: this.article._id }).subscribe((res) => {
        this.router.navigate(['/articles', res.body._id])
      })
    })
  }

  private save(): Observable<HttpResponse<Article>> {
    if (this.article._id) {
      return this.articleService.update(this.article)
    } else {
      return this.articleService.create(this.article)
    }
  }
}
