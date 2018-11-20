import { Component, Input, Output, EventEmitter } from '@angular/core'

import { User, Post } from '../../model'

@Component({
  selector: 'ae-modal-post',
  templateUrl: './modal-post.component.html',
  styleUrls: ['./modal-post.component.css']
})
export class ModalPostComponent {

  @Input() currentUser: User
  @Input() author: User
  @Input() post: Post
  @Output() aeOnDelete = new EventEmitter<void>()

  delete(): void {
    this.aeOnDelete.emit()
  }
}
