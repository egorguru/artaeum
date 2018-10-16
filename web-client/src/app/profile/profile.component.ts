import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { Title } from '@angular/platform-browser'

import { UserService, User } from '../shared'

@Component({
  selector: 'ae-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user: User

  constructor(
    private userService: UserService,
    private activedRoute: ActivatedRoute,
    private router: Router,
    private title: Title
  ) {}

  ngOnInit() {
    this.activedRoute.params.subscribe((params) => {
      this.userService.get(params['login']).subscribe((response) => {
        this.user = response.body
        this.title.setTitle(`${response.body.login} - Artaeum`)
      }, () => this.router.navigate(['/404']))
    })
  }
}
