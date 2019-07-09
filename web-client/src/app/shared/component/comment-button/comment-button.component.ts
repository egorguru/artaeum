import { Component, Input, OnInit } from '@angular/core'

import { CommentService } from '../../service'

@Component({
  selector: 'ae-comment-button',
  templateUrl: './comment-button.component.html',
  styleUrls: ['./comment-button.component.css']
})
export class CommentButtonComponent implements OnInit {

  @Input() resourceType: string
  @Input() resourceId: string

  commentsCount: number

  constructor(private commentService: CommentService) {}

  ngOnInit(): void {
    this.commentService.query(this.resourceType, this.resourceId)
      .subscribe((res) => this.commentsCount = Object.keys(res.body).length || 0)
  }
}
