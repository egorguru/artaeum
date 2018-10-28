import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { Title } from '@angular/platform-browser'

import { User, Post, PostService, UserService } from '../../shared'

@Component({
  selector: 'ae-post',
  templateUrl: './post.component.html'
})
export class PostComponent implements OnInit {

  post: Post
  author: User

  constructor(
    private postService: PostService,
    private userService: UserService,
    private activedRoute: ActivatedRoute,
    private router: Router,
    private title: Title
  ) {}

  ngOnInit() {
    this.activedRoute.params.subscribe((params) => {
      this.postService.get(params['id']).subscribe((res) => {
        this.post = res.body
        this.loadAuthorAndSetTitle()
      }, () => this.router.navigate(['/404']))
    })
  }

  private loadAuthorAndSetTitle() {
    this.userService.get(this.post.userId)
      .subscribe((res) => {
        this.author = res.body
        this.title.setTitle(`@${res.body.login}'s post - Artaeum`)
      })
  }
}
