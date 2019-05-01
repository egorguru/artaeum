package com.artaeum.media.service

import java.time.Instant
import java.util

import com.artaeum.media.domain.Like
import com.artaeum.media.repository.LikeRepository
import org.springframework.data.domain.Example
import org.springframework.stereotype.Service

@Service
class LikeService(likeRepository: LikeRepository) {

  def getAll(like: Like): util.List[Like] = this.likeRepository.findAll(Example.of(like))

  def saveOrRemove(resourceType: String, resourceId: Long, userId: String): Unit = {
    this.likeRepository.findByResourceTypeAndResourceIdAndUserId(resourceType, resourceId, userId) match {
      case l: Like => this.likeRepository.delete(l)
      case _ => this.likeRepository.insert(new Like(resourceType, resourceId, userId, Instant.now()))
    }
  }
}
