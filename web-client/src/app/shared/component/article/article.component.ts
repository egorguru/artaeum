import { Component, Input, EventEmitter, Output } from '@angular/core'

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
  @Output() aeOnDelete = new EventEmitter<void>()

  delete(): void {
    this.aeOnDelete.emit()
  }
}
