package com.artaeum.media.service

import java.time.Instant
import java.util

import com.artaeum.media.domain.Like
import com.artaeum.media.repository.LikeRepository
import com.netflix.appinfo.InstanceInfo
import com.netflix.discovery.EurekaClient
import org.junit.runner.RunWith
import org.junit.{Assert, Test}
import org.mockito.Mockito.when
import org.mockito.MockitoAnnotations.initMocks
import org.mockito.Spy
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.http.{HttpStatus, ResponseEntity}
import org.springframework.test.annotation.DirtiesContext
import org.springframework.test.context.junit4.SpringRunner
import org.springframework.web.client.RestTemplate

@RunWith(classOf[SpringRunner])
@SpringBootTest
@DirtiesContext(classMode = DirtiesContext.ClassMode.BEFORE_EACH_TEST_METHOD)
class LikeServiceTest {

  val USER_ID = "uuid-123"

  @Spy
  var eurekaClient: EurekaClient = _

  @Spy
  var restTemplate: RestTemplate = _

  @Autowired
  var likeService: LikeService = _

  @Autowired
  var likeRepository: LikeRepository = _

  def init(): Unit = {
    initMocks(this)
    val mockInstance = new InstanceInfo(
      "gateway", null, null, null, null,
      new InstanceInfo.PortWrapper(true, 4000), null, null, null, null,
      null, null, null, 1, null,
      "gateway", null, null, null, null,
      false, null, 1L, 1L, null, null)
    val mockInstancesList = new util.LinkedList[InstanceInfo]()
    mockInstancesList.add(mockInstance)
    when(this.eurekaClient.getInstancesById("gateway")).thenReturn(mockInstancesList)

    val badResponse = new ResponseEntity[String](HttpStatus.NOT_FOUND)
    val goodResponse = new ResponseEntity[String](HttpStatus.OK)
    when(this.restTemplate.getForEntity("http://gateway:4000/blog/articles/1", classOf[String])).thenReturn(badResponse)
    when(this.restTemplate.getForEntity("http://gateway:4000/blog/articles/2", classOf[String])).thenReturn(goodResponse)
    when(this.restTemplate.getForEntity("http://gateway:4000/profile/posts/1", classOf[String])).thenReturn(badResponse)
  }

  @Test
  def whenInsertLikeAndGetIt(): Unit = {
    val (resourceType, resourceId, userId) = ("type", 1L, USER_ID)
    this.likeService.saveOrRemove(resourceType, resourceId, userId)
    val result = this.likeService.getAll(new Like(resourceType, resourceId, null, null)).get(0)
    Assert.assertEquals(resourceType, result.resourceType)
    Assert.assertEquals(resourceId, result.resourceId)
    Assert.assertEquals(USER_ID, result.userId)
  }

  @Test
  def whenInsertLikeAndRemoveIt(): Unit = {
    val (resourceType, resourceId, userId) = ("type", 2L, USER_ID)
    this.likeService.saveOrRemove(resourceType, resourceId, userId)
    this.likeService.saveOrRemove(resourceType, resourceId, userId)
    val result = this.likeService.getAll(new Like(resourceType, resourceId, null, null))
    Assert.assertTrue(result.isEmpty)
  }

  @Test
  def whenInsertLikesAndGetOnlyOfFirstUser(): Unit = {
    val (resourceType, firstResourceId, secondResourceId, userId) = ("type", 3L, 4L, USER_ID)
    this.likeService.saveOrRemove(resourceType, firstResourceId, userId)
    this.likeService.saveOrRemove(resourceType, secondResourceId, userId)
    val like = new Like
    like.setUserId(userId)
    val userLikes = this.likeService.getAll(like)
    Assert.assertEquals(2, userLikes.size)
    Assert.assertEquals(USER_ID, userLikes.get(0).userId)
    Assert.assertEquals(USER_ID, userLikes.get(1).userId)
  }

  @Test
  def whenRemoveLikesWithoutRelationship(): Unit = {
    val (_, like2, _) = (
      this.likeRepository.save(new Like("article", 1L, USER_ID, Instant.now())),
      this.likeRepository.save(new Like("article", 2L, USER_ID, Instant.now())),
      this.likeRepository.save(new Like("post", 1L, USER_ID, Instant.now())),
    )
    try {
      this.likeService.removeLikesWithoutRelationships()
    } catch {
      case e: RuntimeException => e.printStackTrace()
    }
    val result = this.likeRepository.findAll()
    Assert.assertEquals(1, result.size())
    Assert.assertEquals(like2, result.get(1))
  }
}
