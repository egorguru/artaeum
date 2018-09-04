package com.artaeum.media.service

import java.util

import com.artaeum.media.client.UaaClient
import com.artaeum.media.domain.Like
import com.artaeum.media.dto.LikeDTO
import com.artaeum.media.repository.LikeRepository
import org.springframework.stereotype.Service

import scala.collection.JavaConverters._

@Service
class LikeService(likeRepository: LikeRepository, uaaClient: UaaClient) {

  def getAll(resourceType: String, resourceId: Long): util.List[LikeDTO] = {
    this.likeRepository.findAllByResourceTypeAndResourceId(resourceType, resourceId).asScala
      .map(l => new LikeDTO(l.resourceType, l.resourceId, this.uaaClient.getUserLoginById(l.userId))).asJava
  }

  def getAll(userLogin: String): util.List[LikeDTO] = {
    this.likeRepository.findAllByUserId(this.uaaClient.getUserIdByLogin(userLogin)).asScala
      .map(l => new LikeDTO(l.resourceType, l.resourceId, userLogin)).asJava
  }

  def saveOrRemove(resourceType: String, resourceId: Long, userLogin: String): Unit = {
    val userId = this.uaaClient.getUserIdByLogin(userLogin)
    this.likeRepository
      .findByResourceTypeAndResourceIdAndUserId(resourceType, resourceId, userId) match {
      case l: Like => this.likeRepository.delete(l)
      case _ => this.likeRepository.insert(new Like(resourceType, resourceId, userId))
    }
  }
}
