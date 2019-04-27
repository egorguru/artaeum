import { Component, OnInit } from '@angular/core'
import { Title } from '@angular/platform-browser'
import { environment as env } from '../../../environments/environment'

import { User, Post, PostService, UserService, Principal } from '../../shared'

@Component({
  selector: 'ae-all-posts',
  templateUrl: './all-posts.component.html'
})
export class AllPostsComponent implements OnInit {

  currentUser: User
  posts: Post[] = []
  users: User[] = []
  page = 0
  totalItems = 0

  constructor(
    private principal: Principal,
    private postService: PostService,
    private userService: UserService,
    private title: Title
  ) {}

  ngOnInit(): void {
    this.title.setTitle('Last posts - Artaeum')
    this.principal.identity().then((u) => this.currentUser = u)
    this.loadPosts()
  }

  loadPosts(): void {
    this.postService.query({
      page: this.page++,
      size: env.POSTS_PER_PAGE,
      sort: ['id,desc']
    }).subscribe((res) => {
      this.posts = this.posts.concat(res.body)
      this.totalItems = +res.headers.get('X-Total-Count')
      this.loadUsers()
    })
  }

  deletePost(id: number): void {
    this.postService.delete(id)
      .subscribe(() => this.posts.map((p, i) => {
        if (p.id === id) {
          this.posts.splice(i, 1)
        }
      }))
  }

  isLoadMoreButton(): boolean {
    return !this.posts && this.totalItems > this.posts.length &&
      this.roundTo10(this.posts.length * (this.page / env.POSTS_PER_PAGE + 1)) <
      this.roundTo10(this.totalItems)
  }

  private loadUsers(): void {
    this.posts.map((s) => {
      if (!this.users[s.userId]) {
        this.userService.get(s.userId)
          .subscribe((res) => this.users[s.userId] = res.body)
      }
    })
  }

  private roundTo10(num): number {
    return Math.ceil(num / 10) * 10;
  }
}
