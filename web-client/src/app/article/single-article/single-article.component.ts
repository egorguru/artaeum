import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { Title } from '@angular/platform-browser'
import { environment as env } from '../../../environments/environment'

import {
  User, Article,
  ArticleService, UserService,
  SmartButtonService, Principal
} from '../../shared'

@Component({
  selector: 'ae-single-article',
  templateUrl: './single-article.component.html',
  styleUrls: ['./single-article.component.css']
})
export class SingleArticleComponent implements OnInit {

  article: Article
  author: User
  imageUrl: string

  constructor(
    private principal: Principal,
    private smartButtonService: SmartButtonService,
    private articleService: ArticleService,
    private userService: UserService,
    private activedRoute: ActivatedRoute,
    private router: Router,
    private title: Title
  ) {}

  ngOnInit() {
    this.imageUrl = env.IMAGE_BASE_URL + 'blog/'
    this.activedRoute.params.subscribe((params) => {
      this.articleService.get(params['id']).subscribe((res) => {
        this.article = res.body
        this.title.setTitle(`${res.body.title} - Artaeum`)
        this.checkUserAndInitSmartButton()
        this.loadAuthor()
      }, () => this.router.navigate(['/404']))
    })
  }

  private checkUserAndInitSmartButton(): void {
    this.principal.identity().then((u) => {
      if (this.article.userId === u.id) {
        this.smartButtonService.add({
          className: 'fa fa-edit',
          link: 'author/articles/' + this.article._id,
          title: 'Edit'
        })
      }
    })
  }

  private loadAuthor() {
    this.userService.get(this.article.userId)
      .subscribe((res) => this.author = res.body)
  }
}
