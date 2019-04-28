package com.artaeum.media.service

import java.time.Instant
import java.util

import com.artaeum.media.domain.Like
import com.artaeum.media.repository.LikeRepository
import com.netflix.discovery.EurekaClient
import org.springframework.data.domain.Example
import org.springframework.scheduling.annotation.Scheduled
import org.springframework.stereotype.Service
import org.springframework.web.client.RestTemplate

@Service
class LikeService(likeRepository: LikeRepository,
                  restTemplate: RestTemplate,
                  eurekaClient: EurekaClient) {

  def resourceService = Map("article" -> "blog", "post" -> "profile")

  def getAll(like: Like): util.List[Like] = this.likeRepository.findAll(Example.of(like))

  def saveOrRemove(resourceType: String, resourceId: Long, userId: String): Unit = {
    this.likeRepository.findByResourceTypeAndResourceIdAndUserId(resourceType, resourceId, userId) match {
      case l: Like => this.likeRepository.delete(l)
      case _ => this.likeRepository.insert(new Like(resourceType, resourceId, userId, Instant.now()))
    }
  }

  @Scheduled(cron = "0 0 3 * * ?")
  def removeLikesWithoutRelationships(): Unit = {
    val gateway = this.eurekaClient.getInstancesById("gateway").get(0)
    this.likeRepository.findAll().forEach(like => {
      val response = this.restTemplate.getForEntity(
        this.processUrl(gateway.getHostName, gateway.getPort, like.resourceType, like.resourceId), classOf[String])
      if (response.getStatusCode.value() == 404) {
        this.likeRepository.delete(like)
      }
    })
  }

  private def processUrl(host: String, port: Int, resource: String, id: Long): String = String.format(
    "http://%s:%s/%s/%ss/%s",
    host, port.toString, this.resourceService(resource), resource, id.toString
  )
}
