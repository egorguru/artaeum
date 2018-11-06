import { Component, OnInit } from '@angular/core'
import { Title } from '@angular/platform-browser'
import { environment as env } from '../../../environments/environment'

import { User, BlogService, UserService, Principal, BlogPost } from '../../shared'

@Component({
  selector: 'ae-all-blog-posts',
  templateUrl: './all-blog-posts.component.html'
})
export class AllBlogPostsComponent implements OnInit {

  currentUser: User
  articles: BlogPost[] = []
  users: User[] = []

  page = 0

  constructor(
    private principal: Principal,
    private blogService: BlogService,
    private userService: UserService,
    private title: Title
  ) {}

  ngOnInit() {
    this.title.setTitle('Last posts - Artaeum')
    this.principal.identity().then((u) => this.currentUser = u)
    this.loadArticles()
  }

  loadArticles(): void {
    this.blogService.query({
      page: this.page++,
      size: env.POSTS_PER_PAGE,
      sort: ['id,desc']
    }).subscribe((res) => {
      this.articles = this.articles.concat(res.body)
      this.loadUsers()
    })
  }

  deleteArticle(id: number): void {
    this.blogService.delete(id)
      .subscribe(() => this.articles.map((a, i) => {
        if (a._id === id) {
          this.articles.splice(i, 1)
        }
      }))
  }

  private loadUsers(): void {
    this.articles.map((s) => {
      if (!this.users[s.userId]) {
        this.userService.get(s.userId)
          .subscribe((res) => this.users[s.userId] = res.body)
      }
    })
  }
}
