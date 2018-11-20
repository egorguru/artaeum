import { Component, Input, Output, EventEmitter } from '@angular/core'

import { User, Post } from '../../model'

@Component({
  selector: 'ae-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent {

  @Input() post: Post
  @Input() author: User
  @Input() currentUser: User
  @Input() modal: boolean
  @Output() aeOnDelete = new EventEmitter<void>()

  delete(): void {
    this.aeOnDelete.emit()
  }
}
