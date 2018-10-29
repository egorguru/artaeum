import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { environment as env} from '../../../environments/environment'

import { BlogService, Principal, BlogPost } from '../../shared'

@Component({
  selector: 'ae-create-update-blog-post',
  templateUrl: './create-update-blog-post.component.html'
})
export class CreateUpdateBlogPostComponent implements OnInit {

  blogPost: BlogPost
  toolbar: any

  constructor(
    private blogService: BlogService,
    private principal: Principal,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.toolbar = env.QUILL_TOOLBAR
    this.route.params.subscribe((params) => {
      if (params['id']) {
        this.blogService.get(params['id'])
          .subscribe((res) => this.checkAuthorAndInitBlogPost(res.body))
      } else {
        this.blogPost = new BlogPost()
      }
    })
  }

  save(): void {
    if (this.blogPost._id) {
      this.blogService.update(this.blogPost)
        .subscribe((res) => this.successfulSave(res.body._id))
    } else {
      this.blogService.create(this.blogPost)
        .subscribe((res) => this.successfulSave(res.body._id))
    }
  }

  private checkAuthorAndInitBlogPost(blogPost: BlogPost): void {
    this.principal.identity().then((user) => {
      if (user.id !== blogPost.userId) {
        this.router.navigate(['/'])
      } else {
        this.blogPost = blogPost
      }
    })
  }

  private successfulSave(postId: number) {
    this.router.navigate(['/blogs', postId])
  }
}
