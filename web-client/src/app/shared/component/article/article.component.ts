import { Component, Input, OnInit } from '@angular/core'

import { User, Article, Category } from '../../model'
import { CategoryService } from '../../service'

@Component({
  selector: 'ae-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {

  @Input() article: Article
  @Input() author: User
  @Input() currentUser: User

  category: Category

  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void {
    if (this.article.category) {
      this.categoryService.get(this.article.category)
        .subscribe((res) => this.category = res.body)
    }
  }
}
