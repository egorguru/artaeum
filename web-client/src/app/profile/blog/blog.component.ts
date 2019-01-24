import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'

import {
  User, UserService,
  Principal, SmartButtonService,
  Category, CategoryService
} from '../../shared'

@Component({
  selector: 'ae-blog',
  templateUrl: './blog.component.html'
})
export class BlogComponent implements OnInit {

  user: User
  categories: Category[]

  constructor(
    private smartButtonService: SmartButtonService,
    private userService: UserService,
    private categoryService: CategoryService,
    private principal: Principal,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.parent.params
      .subscribe((params) => this.userService.get(params['login'])
        .subscribe((res) => {
          this.user = res.body
          this.categoryService.getAll(res.body.id)
            .subscribe((categories) => this.categories = categories.body)
          this.principal.identity().then((u) => {
            if (u && params['login'] === u.login) {
              this.smartButtonService.add({
                className: 'fa fa-pencil',
                link: 'author/articles',
                title: 'Create article'
              })
            }
          })
        }))
  }
}
