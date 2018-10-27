import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { Title } from '@angular/platform-browser'

import { User, BlogPost, BlogService, UserService } from '../../shared'

@Component({
  selector: 'ae-blog-post',
  templateUrl: './blog-post.component.html',
  styleUrls: ['./blog-post.component.css']
})
export class BlogPostComponent implements OnInit {

  blogPost: BlogPost
  author: User

  constructor(
    private blogService: BlogService,
    private userService: UserService,
    private activedRoute: ActivatedRoute,
    private router: Router,
    private title: Title
  ) {}

  ngOnInit() {
    this.activedRoute.params.subscribe((params) => {
      this.blogService.get(params['id']).subscribe((res) => {
        this.blogPost = res.body
        this.title.setTitle(`${res.body.title} - Artaeum`)
        this.loadAuthor()
      }, () => this.router.navigate(['/404']))
    })
  }

  private loadAuthor() {
    this.userService.get(this.blogPost.userId)
      .subscribe((res) => this.author = res.body)
  }
}
