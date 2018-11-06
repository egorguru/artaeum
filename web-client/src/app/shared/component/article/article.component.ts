import { Component, Input } from '@angular/core'

import { User, Article } from '../../model'

@Component({
  selector: 'ae-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent {

  @Input() article: Article
  @Input() author: User
  @Input() currentUser: User
  @Input() deleteFunction: Function

  delete(): void {
    this.deleteFunction(this.article._id)
  }
}
