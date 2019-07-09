import { Component, Input, OnInit } from '@angular/core'
import { FormGroup, FormControl, Validators } from '@angular/forms'

import { User, Comment } from '../../model'
import { CommentService, UserService } from '../../service'
import { Principal } from '../../auth'

@Component({
  selector: 'ae-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {

  @Input() resourceType: string
  @Input() resourceId: string

  currentUser: User
  comments: Comment[]
  users: User[] = []
  form: FormGroup

  constructor(
    private commentService: CommentService,
    private userService: UserService,
    private principal: Principal
  ) {}

  ngOnInit(): void {
    this.principal.identity().then((u) => {
      this.currentUser = u
      this.loadAll()
    })
    this.form = new FormGroup({
      'text': new FormControl(null, [
        Validators.required,
        Validators.minLength(3)
      ])
    })
  }

  getUser(id: number): User {
    return this.users.find((u) => u.id === id)
  }

  createComment(): void {
    const comment = {
      text: this.form.value.text,
      resourceType: this.resourceType,
      resourceId: this.resourceId
    }
    this.form.reset()
    this.commentService.create(comment).subscribe(() => this.loadAll())
  }

  deleteComment(id: number): void {
    this.commentService.delete(id).subscribe(() => this.loadAll())
  }

  private loadAll(): void {
    this.commentService.query(this.resourceType, this.resourceId)
      .subscribe((comments) => {
        this.comments = comments.body
        this.loadUsers()
      })
  }

  private loadUsers(): void {
    this.comments.map((c) => {
      this.userService.get(c.userId)
        .subscribe((u) => this.users.push(u.body))
    })
  }
}
