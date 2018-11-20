import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { Title } from '@angular/platform-browser'

import { User, Post, PostService, UserService, Principal } from '../../shared'

@Component({
  selector: 'ae-single-post',
  templateUrl: './single-post.component.html'
})
export class SinglePostComponent implements OnInit {

  currentUser: User
  post: Post
  author: User

  constructor(
    private principal: Principal,
    private postService: PostService,
    private userService: UserService,
    private activedRoute: ActivatedRoute,
    private router: Router,
    private title: Title
  ) {}

  ngOnInit(): void {
    this.principal.identity().then((u) => this.currentUser = u)
    this.activedRoute.params.subscribe((params) => {
      this.postService.get(params['id']).subscribe((res) => {
        this.post = res.body
        this.loadAuthorAndSetTitle()
      }, () => this.router.navigate(['/404']))
    })
  }

  deletePost(id: number): void {
    this.postService.delete(id)
      .subscribe(() => this.router.navigate(['/u', this.currentUser.login]))
  }

  private loadAuthorAndSetTitle(): void {
    this.userService.get(this.post.userId).subscribe((res) => {
      this.author = res.body
      this.title.setTitle(`@${res.body.login}'s post - Artaeum`)
    })
  }
}
