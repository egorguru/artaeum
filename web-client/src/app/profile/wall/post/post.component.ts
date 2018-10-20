import { Component, Input } from '@angular/core'

import { User, Post } from '../../../shared'

@Component({
  selector: 'ae-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent {

  @Input() post: Post
  @Input() author: User
  @Input() currentUser: User
  @Input() deleteFunction: Function

  delete(id: number) {
    this.deleteFunction(id)
  }
}
