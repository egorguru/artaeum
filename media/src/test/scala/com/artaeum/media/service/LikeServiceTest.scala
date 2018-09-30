package com.artaeum.media.service

import org.junit.runner.RunWith
import org.junit.{Assert, Test}
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.test.annotation.DirtiesContext
import org.springframework.test.context.junit4.SpringRunner

@RunWith(classOf[SpringRunner])
@SpringBootTest
@DirtiesContext(classMode = DirtiesContext.ClassMode.BEFORE_EACH_TEST_METHOD)
class LikeServiceTest {

  val USER_ID = "uuid-123"

  @Autowired
  var likeService: LikeService = _

  @Test
  def whenInsertLikeAndGetIt(): Unit = {
    val (resourceType, resourceId, userLogin) = ("type", 1, USER_ID)
    this.likeService.saveOrRemove(resourceType, resourceId, userLogin)
    val result = this.likeService.getAll(resourceType, resourceId).get(0)
    Assert.assertEquals(resourceType, result.resourceType)
    Assert.assertEquals(resourceId, result.resourceId)
    Assert.assertEquals(USER_ID, result.userId)
  }

  @Test
  def whenInsertLikeAndRemoveIt(): Unit = {
    val (resourceType, resourceId, userLogin) = ("type", 2, USER_ID)
    this.likeService.saveOrRemove(resourceType, resourceId, userLogin)
    this.likeService.saveOrRemove(resourceType, resourceId, userLogin)
    val result = this.likeService.getAll(resourceType, resourceId)
    Assert.assertTrue(result.isEmpty)
  }

  @Test
  def whenInsertLikesAndGetOnlyForFirstUser(): Unit = {
    val (resourceType, firstResourceId, secondResourceId, userLogin) = ("type", 3, 4, USER_ID)
    this.likeService.saveOrRemove(resourceType, firstResourceId, userLogin)
    this.likeService.saveOrRemove(resourceType, secondResourceId, userLogin)
    val userLikes = this.likeService.getAll(userLogin)
    Assert.assertEquals(2, userLikes.size)
    Assert.assertEquals(USER_ID, userLikes.get(0).userId)
    Assert.assertEquals(USER_ID, userLikes.get(1).userId)
  }
}
