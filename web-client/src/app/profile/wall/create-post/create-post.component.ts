import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core'
import { FormGroup, FormControl, Validators } from '@angular/forms'

import { User, PostService } from '../../../shared'

@Component({
  selector: 'ae-create-post',
  templateUrl: './create-post.component.html'
})
export class CreatePostComponent implements OnInit {

  @Input() currentUser: User
  @Output() updateWall = new EventEmitter<void>()

  form: FormGroup

  constructor(private postService: PostService) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      'text': new FormControl(null, [
        Validators.required,
        Validators.minLength(1)
      ])
    })
  }

  onSubmit(): void {
    const post = { text: this.form.value.text }
    this.form.reset()
    this.postService.create(post).subscribe(() => {
      this.updateWall.emit()
    })
  }
}
