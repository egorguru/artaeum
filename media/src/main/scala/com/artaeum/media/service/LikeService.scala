package com.artaeum.media.service

import java.util

import com.artaeum.media.domain.Like
import com.artaeum.media.repository.LikeRepository
import org.springframework.stereotype.Service

@Service
class LikeService(likeRepository: LikeRepository) {

  def getAll(resourceType: String, resourceId: Long): util.List[Like] = {
    this.likeRepository.findAllByResourceTypeAndResourceId(resourceType, resourceId)
  }

  def getAll(userId: String): util.List[Like] = {
    this.likeRepository.findAllByUserId(userId)
  }

  def saveOrRemove(resourceType: String, resourceId: Long, userId: String): Unit = {
    this.likeRepository.findByResourceTypeAndResourceIdAndUserId(resourceType, resourceId, userId) match {
      case l: Like => this.likeRepository.delete(l)
      case _ => this.likeRepository.insert(new Like(resourceType, resourceId, userId))
    }
  }
}
