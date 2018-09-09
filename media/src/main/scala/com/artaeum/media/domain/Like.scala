package com.artaeum.media.domain

import java.time.Instant

import org.springframework.data.annotation.Id
import org.springframework.data.mongodb.core.mapping.Document

import scala.beans.BeanProperty

@Document(collection = "likes")
class Like(@BeanProperty @Id var id: String,
           @BeanProperty var resourceType: String,
           @BeanProperty var resourceId: Long,
           @BeanProperty var userId: Long,
           @BeanProperty var createdDate: Instant = Instant.now()) {

  def this(resourceType: String,
           resourceId: Long,
           userId: Long) = this(null, resourceType, resourceId, userId)

  def this() = this(null, null, 0, 0)
}
