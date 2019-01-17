import { Component, OnInit } from '@angular/core'
import { Title } from '@angular/platform-browser'

import { Principal, User, ProfileImagesService } from '../../shared'

@Component({
  selector: 'ae-change-avatar',
  templateUrl: './change-avatar.component.html'
})
export class ChangeAvatarComponent implements OnInit {

  image: string
  currentUser: User

  constructor(
    private principal: Principal,
    private profileImagesService: ProfileImagesService,
    private title: Title
  ) {}

  ngOnInit(): void {
    this.title.setTitle('Profile image - Artaeum')
    this.principal.identity().then((u) => this.currentUser = u)
  }

  setImage(image: string): void {
    this.image = image
  }

  save(): void {
    this.profileImagesService.changeAvatar(this.image)
      .subscribe(() => this.image = null)
  }
}
