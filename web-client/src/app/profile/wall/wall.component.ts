import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { environment as env } from '../../../environments/environment'

import { UserService, User, Post, PostService, Principal } from '../../shared'

@Component({
  selector: 'ae-wall',
  templateUrl: './wall.component.html'
})
export class WallComponent implements OnInit {

  currentUser: User
  user: User
  posts: Post[]
  page: any
  previousPage: any
  totalItems: any
  postsPerPage: number

  constructor(
    public userService: UserService,
    public postService: PostService,
    public activatedRoute: ActivatedRoute,
    public router: Router,
    public principal: Principal
  ) {}

  ngOnInit(): void {
    this.postsPerPage = env.POSTS_PER_PAGE
    this.activatedRoute.data.subscribe((data) => {
      this.page = data.pagingParams.page
      this.previousPage = data.pagingParams.page
    })
    this.activatedRoute.parent.params
      .subscribe((params) => this.userService.get(params['login'])
        .subscribe((res) => {
          this.user = res.body
          this.loadAll()
        }))
    this.principal.identity().then((user) => this.currentUser = user)
  }

  loadAll(): void {
    this.postService.query({
      page: this.page - 1,
      size: this.postsPerPage,
      sort: ['id,desc'],
      userId: this.user.id
    }).subscribe((res) => {
      this.posts = res.body
      this.totalItems = res.headers.get('X-Total-Count')
    })
  }

  loadPage(page: number): void {
    if (page !== this.previousPage) {
      this.previousPage = page
      this.router.navigate(['/u', this.user.login], {
        queryParams: {
          page: this.page,
          size: this.postsPerPage,
          sort: ['id,desc']
        }
      })
      this.loadAll()
    }
  }

  deletePost(id: number): void {
    this.postService.delete(id)
      .subscribe(() => this.posts.map((p, i) => {
        if (p.id === id) {
          this.posts.splice(i, 1)
        }
      }))
  }
}
