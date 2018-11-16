import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { environment as env} from '../../../environments/environment'

import { ArticleService, Principal, Article } from '../../shared'

@Component({
  selector: 'ae-create-update-article',
  templateUrl: './create-update-article.component.html'
})
export class CreateUpdateArticleComponent implements OnInit {

  article: Article
  toolbar: any

  constructor(
    private articleService: ArticleService,
    private principal: Principal,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.toolbar = env.QUILL_TOOLBAR
    this.route.params.subscribe((params) => {
      if (params['id']) {
        this.articleService.get(params['id'])
          .subscribe((res) => this.checkAuthorAndInitArticle(res.body))
      } else {
        this.article = new Article()
      }
    })
  }

  loadImg($event): void {
    const reader: FileReader = new FileReader()
    reader.onloadend = () => this.article.image = reader.result.toString()
    reader.readAsDataURL($event.target.files[0])
  }

  save(): void {
    if (this.article._id) {
      this.articleService.update(this.article)
        .subscribe((res) => this.successfulSave(res.body._id))
    } else {
      this.articleService.create(this.article)
        .subscribe((res) => this.successfulSave(res.body._id))
    }
  }

  private checkAuthorAndInitArticle(article: Article): void {
    this.principal.identity().then((user) => {
      if (user.id !== article.userId) {
        this.router.navigate(['/'])
      } else {
        this.article = article
      }
    })
  }

  private successfulSave(postId: number) {
    this.router.navigate(['/articles', postId])
  }
}
