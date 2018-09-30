package com.artaeum.media.repository

import java.util

import com.artaeum.media.domain.Like
import org.springframework.data.mongodb.repository.MongoRepository
import org.springframework.stereotype.Repository

@Repository
trait LikeRepository extends MongoRepository[Like, String] {

  def findAllByResourceTypeAndResourceId(resourceType: String, resourceId: Long): util.List[Like]

  def findAllByUserId(userId: String): util.List[Like]

  def findByResourceTypeAndResourceIdAndUserId(resourceType: String, resourceId: Long, userId: String): Like
}
