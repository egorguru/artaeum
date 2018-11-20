import { Component, OnInit } from '@angular/core'
import { Title } from '@angular/platform-browser'
import { environment as env } from '../../../environments/environment'

import { User, ArticleService, UserService, Principal, Article } from '../../shared'

@Component({
  selector: 'ae-all-articles',
  templateUrl: './all-articles.component.html'
})
export class AllArticlesComponent implements OnInit {

  currentUser: User
  articles: Article[] = []
  users: User[] = []
  page = 0

  constructor(
    private title: Title,
    private principal: Principal,
    private articleService: ArticleService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.title.setTitle('Last articles - Artaeum')
    this.principal.identity().then((u) => this.currentUser = u)
    this.loadArticles()
  }

  loadArticles(): void {
    this.articleService.query({
      page: this.page++,
      size: env.POSTS_PER_PAGE,
      sort: ['id,desc']
    }).subscribe((res) => {
      this.articles = this.articles.concat(res.body)
      this.loadUsers()
    })
  }

  deleteArticle(id: number): void {
    this.articleService.delete(id)
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
