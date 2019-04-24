package com.artaeum.media.controller

import java.security.Principal
import java.util

import com.artaeum.media.domain.Like
import com.artaeum.media.service.LikeService
import org.springframework.web.bind.annotation._

@RestController
class LikeController(likeService: LikeService) {

  @GetMapping(Array("/likes"))
  def getAllForResource(like: Like): util.List[Like] = this.likeService.getAll(like)

  @PostMapping(Array("/likes"))
  def saveOrRemove(@RequestBody like: Like, principal: Principal): Unit = {
    this.likeService.saveOrRemove(like.resourceType, like.resourceId, principal.getName)
  }
}
