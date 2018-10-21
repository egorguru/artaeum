import { Component, Input, OnInit } from '@angular/core'

import { LikeService } from '../../service'
import { Principal } from '../../auth'
import { User, Like } from '../../model'

@Component({
  selector: 'ae-like',
  templateUrl: './like.component.html',
  styleUrls: ['./like.component.css']
})
export class LikeComponent implements OnInit {

  @Input() resourceType: string
  @Input() resourceId: number

  currentUser: User
  likes: Like[]
  countOfLikes: number
  isLike: boolean

  constructor(
    private likeService: LikeService,
    private principal: Principal
  ) {}

  ngOnInit() {
    this.principal.identity().then((u) => this.currentUser = u)
    this.loadAll()
  }

  like(): void {
    if (this.currentUser) {
      this.likeService
        .saveOrRemove(this.resourceType, this.resourceId)
        .subscribe(this.loadAll)
    }
  }

  loadAll(): void {
    this.likeService
      .getAllForResource(this.resourceType, this.resourceId)
      .subscribe((res) => {
        this.likes = res.body
        this.countOfLikes = Object.keys(res.body).length || 0
        this.isLike = this.currentUser &&
          !!this.likes.find((l) => l.userId === this.currentUser.id)
      })
  }
}
