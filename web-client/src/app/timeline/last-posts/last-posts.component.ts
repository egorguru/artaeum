import { Component, OnInit } from '@angular/core'
import { Title } from '@angular/platform-browser'
import { environment as env} from '../../../environments/environment'

import { Principal, SubscriptionService, UserService, PostService, User, Post, Subscription } from '../../shared'

@Component({
  selector: 'ae-last-posts',
  templateUrl: './last-posts.component.html'
})
export class LastPostsComponent implements OnInit {

  currentUser: User
  posts: Post[] = []
  users: User[] = []

  private page = 0
  private userIds: string[] = []

  constructor(
    private principal: Principal,
    private subscriptionService: SubscriptionService,
    private userService: UserService,
    private postService: PostService,
    private title: Title
  ) {}

  ngOnInit() {
    this.title.setTitle('Posts from your subscriptions - Artaeum')
    this.principal.identity().then((u) => {
      this.currentUser = u
      this.subscriptionService.queryForAllSubscriptions(u.id)
        .subscribe((res) => this.loadUsers(res.body))
    })
  }

  loadPosts(): void {
    this.postService.query({
      page: this.page++,
      size: env.POSTS_PER_PAGE,
      sort: ['id,desc'],
      userId: this.userIds
    }).subscribe((res) => {
      this.posts = this.posts.concat(res.body)
    })
  }

  deletePost(id: number): void {
    this.postService.delete(id).subscribe(() => this.posts.map((p, i) => {
      if (p.id === id) {
        this.posts.splice(i, 1)
      }
    }))
  }

  private loadUsers(subs: Subscription[]): void {
    subs.map((s, i) => this.userService.get(s.profileId).subscribe((u) => {
      this.users[u.body.id] = u.body
      this.userIds.push(u.body.id)
      if (i === Object.keys(subs).length - 1) {
        this.loadPosts()
      }
    }))
  }
}
