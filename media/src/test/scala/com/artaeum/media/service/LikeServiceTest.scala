package com.artaeum.media.service

import com.artaeum.media.domain.Like
import com.artaeum.media.repository.LikeRepository
import com.netflix.discovery.EurekaClient
import org.junit.runner.RunWith
import org.junit.{Assert, Test}
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.boot.test.mock.mockito.MockBean
import org.springframework.test.annotation.DirtiesContext
import org.springframework.test.context.junit4.SpringRunner

@RunWith(classOf[SpringRunner])
@SpringBootTest
@DirtiesContext(classMode = DirtiesContext.ClassMode.BEFORE_EACH_TEST_METHOD)
class LikeServiceTest {

  val USER_ID = "uuid-123"

  @MockBean
  var eurekaClient: EurekaClient = _

  @Autowired
  var likeService: LikeService = _

  @Autowired
  var likeRepository: LikeRepository = _

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
}
