import { Component, Input, Output, EventEmitter } from '@angular/core'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'

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
  @Output() aeOnDelete = new EventEmitter<void>()

  constructor(private modalService: NgbModal) {}

  delete(): void {
    this.modalService.dismissAll('Remove post')
    this.aeOnDelete.emit()
  }

  modal(content): void {
    this.modalService.open(content, { ariaLabelledBy: 'modal-delete-post' })
  }
}
