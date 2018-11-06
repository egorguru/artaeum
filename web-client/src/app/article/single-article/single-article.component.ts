import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { Title } from '@angular/platform-browser'

import { User, Article, ArticleService, UserService } from '../../shared'

@Component({
  selector: 'ae-single-article',
  templateUrl: './single-article.component.html',
  styleUrls: ['./single-article.component.css']
})
export class SingleArticleComponent implements OnInit {

  article: Article
  author: User

  constructor(
    private articleService: ArticleService,
    private userService: UserService,
    private activedRoute: ActivatedRoute,
    private router: Router,
    private title: Title
  ) {}

  ngOnInit() {
    this.activedRoute.params.subscribe((params) => {
      this.articleService.get(params['id']).subscribe((res) => {
        this.article = res.body
        this.title.setTitle(`${res.body.title} - Artaeum`)
        this.loadAuthor()
      }, () => this.router.navigate(['/404']))
    })
  }

  private loadAuthor() {
    this.userService.get(this.article.userId)
      .subscribe((res) => this.author = res.body)
  }
}
