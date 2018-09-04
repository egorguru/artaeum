package com.artaeum.media.controller

import java.security.Principal
import java.util

import com.artaeum.media.dto.LikeDTO
import com.artaeum.media.service.LikeService
import org.springframework.web.bind.annotation._

@RestController
class LikeController(likeService: LikeService) {

  @GetMapping(Array("/{resourceType}/{resourceId}/likes"))
  def getAllForResource(@PathVariable resourceType: String,
                        @PathVariable resourceId: Long): util.List[LikeDTO] = this.likeService.getAll(resourceType, resourceId)

  @GetMapping(path = Array("/{userLogin}/likes"))
  def getAllForUser(@PathVariable userLogin: String): util.List[LikeDTO] = this.likeService.getAll(userLogin)

  @PostMapping(Array("/{resourceType}/{resourceId}/likes"))
  def saveOrRemove(@PathVariable resourceType: String,
                   @PathVariable resourceId: Long,
                   principal: Principal): Unit = this.likeService.saveOrRemove(resourceType, resourceId, principal.getName)
}
