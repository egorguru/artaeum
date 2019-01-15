import { Component, OnInit } from '@angular/core'
import { Title } from '@angular/platform-browser'
import { CropperSettings } from 'ng2-img-cropper'

import { Principal, User, ProfileImagesService } from '../../shared'

@Component({
  selector: 'ae-change-avatar',
  templateUrl: './change-avatar.component.html'
})
export class ChangeAvatarComponent implements OnInit {

  data: any
  cropperSettings: CropperSettings
  currentUser: User

  constructor(
    private principal: Principal,
    private profileImagesService: ProfileImagesService,
    private title: Title
  ) {}

  ngOnInit(): void {
    this.title.setTitle('Profile image - Artaeum')
    this.principal.identity().then((u) => this.currentUser = u)
    this.cropperSettings = new CropperSettings()
    this.cropperSettings.croppedWidth = 300
    this.cropperSettings.croppedHeight = 300
    this.cropperSettings.dynamicSizing = true
    this.cropperSettings.cropperClass = 'image-canvas'
    this.cropperSettings.compressRatio = 0.5
    this.data = {}
  }

  save(): void {
    this.profileImagesService.changeAvatar(this.data.image)
      .subscribe(() => this.data.image = null)
  }
}
