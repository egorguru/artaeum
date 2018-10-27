import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { environment as env } from '../../../environments/environment'

import { UserService, User, BlogPost, BlogService, Principal } from '../../shared'

@Component({
  selector: 'ae-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {

  currentUser: User
  user: User
  blogPosts: BlogPost[]
  page: any
  previousPage: any
  totalItems: any
  postsPerPage: number

  constructor(
    public userService: UserService,
    public blogService: BlogService,
    public principal: Principal,
    public activatedRoute: ActivatedRoute,
    public router: Router
  ) {}

  ngOnInit() {
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

  loadAll() {
    this.blogService.query({
      page: this.page - 1,
      size: this.postsPerPage,
      sort: ['id,desc'],
      userId: this.user.id
    }).subscribe((res) => {
      this.blogPosts = res.body
      this.totalItems = res.headers.get('X-Total-Count')
    })
  }

  loadPage(page: number) {
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
}
