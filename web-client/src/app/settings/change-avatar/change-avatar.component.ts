import { Component, OnInit } from '@angular/core'
import { Title } from '@angular/platform-browser'

import { Principal, User, ProfileImagesService, ImageHelper } from '../../shared'

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
    private imageHelper: ImageHelper,
    private title: Title
  ) {}

  ngOnInit(): void {
    this.title.setTitle('Profile image - Artaeum')
    this.principal.identity().then((u) => this.currentUser = u)
  }

  loadImg($event): void {
    this.imageHelper.compress($event.target.files[0])
      .then((compressedImage) => this.imageHelper.toBase64(compressedImage))
      .then((base64Image) => this.image = base64Image)
  }

  save(): void {
    this.profileImagesService.changeAvatar(this.image)
      .subscribe(() => this.image = null)
  }
}
