import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { environment as env } from '../../../environments/environment'

import { UserService, User } from '../../shared'

@Component({
  selector: 'ae-search-profiles',
  templateUrl: './profiles.component.html'
})
export class ProfilesComponent implements OnInit {

  currentUser: User
  users: User[]
  query: string
  page: any
  previousPage: any
  totalItems: any
  postsPerPage: number

  constructor(
    public userService: UserService,
    public activatedRoute: ActivatedRoute,
    public router: Router
  ) {}

  ngOnInit() {
    this.postsPerPage = env.POSTS_PER_PAGE
    this.activatedRoute.data.subscribe((data) => {
      this.page = data.pagingParams.page
      this.previousPage = data.pagingParams.page
    })
    this.activatedRoute.parent.queryParams.subscribe((params) => {
      this.query = params['query']
      this.loadAll()
    })
  }

  loadAll() {
    this.userService.search({
      page: this.page - 1,
      size: this.postsPerPage,
      sort: ['id,desc'],
      query: this.query
    }).subscribe((res) => {
      this.users = res.body
      this.totalItems = res.headers.get('X-Total-Count')
    })
  }

  loadPage(page: number) {
    if (page !== this.previousPage) {
      this.previousPage = page
      this.router.navigate(['/search'], {
        queryParams: {
          page: this.page,
          size: this.postsPerPage,
          sort: ['id,desc'],
          query: this.query
        }
      })
      this.loadAll()
    }
  }
}
