import { Component, Input } from '@angular/core'

import { User, Post } from '../../../shared'

@Component({
  selector: 'ae-modal-post',
  templateUrl: './modal-post.component.html',
  styleUrls: ['./modal-post.component.css']
})
export class ModalPostComponent {

  @Input() deleteFunction: Function
  @Input() currentUser: User
  @Input() author: User
  @Input() post: Post

  delete(id: number) {
    this.deleteFunction(id)
  }
}
