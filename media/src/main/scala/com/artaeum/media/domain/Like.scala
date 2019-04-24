package com.artaeum.media.domain

import java.lang.Long
import java.time.Instant

import org.springframework.data.annotation.Id
import org.springframework.data.mongodb.core.mapping.Document

import scala.beans.BeanProperty

@Document(collection = "likes")
class Like(@BeanProperty @Id var id: String,
           @BeanProperty var resourceType: String,
           @BeanProperty var resourceId: Long,
           @BeanProperty var userId: String,
           @BeanProperty var createdDate: Instant) {

  def this(resourceType: String,
           resourceId: Long,
           userId: String,
           createdDate: Instant) = this(null, resourceType, resourceId, userId, createdDate)

  def this() = this(null, null, null, null)
}
