import { Component, OnInit } from '@angular/core'
import { Title } from '@angular/platform-browser'
import { environment as env } from '../../../environments/environment'

import { Principal, User } from '../../shared'
import { ProfileImagesService } from 'src/app/shared/service/profile-images.service'

@Component({
  selector: 'ae-change-background',
  templateUrl: './change-background.component.html'
})
export class ChangeBackgroundComponent implements OnInit {

  imageUrl: string
  image: string
  currentUser: User

  constructor(
    private principal: Principal,
    private profileImagesService: ProfileImagesService,
    private title: Title
  ) {}

  ngOnInit() {
    this.imageUrl = env.IMAGE_BASE_URL + 'profile/'
    this.title.setTitle('Profile background image - Artaeum')
    this.principal.identity().then((u) => this.currentUser = u)
  }

  loadImg($event): void {
    const reader: FileReader = new FileReader()
    reader.onloadend = () => this.image = reader.result.toString()
    reader.readAsDataURL($event.target.files[0])
  }

  save(): void {
    this.profileImagesService.changeBackground(this.image)
      .subscribe(() => this.image = null)
  }
}
