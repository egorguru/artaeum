package com.artaeum.media.service

import com.artaeum.media.client.UaaClient
import org.junit.runner.RunWith
import org.junit.{Assert, Before, Test}
import org.mockito.Mockito.when
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.boot.test.mock.mockito.MockBean
import org.springframework.context.ApplicationContext
import org.springframework.test.annotation.DirtiesContext
import org.springframework.test.context.junit4.SpringRunner

@RunWith(classOf[SpringRunner])
@SpringBootTest
@DirtiesContext(classMode = DirtiesContext.ClassMode.BEFORE_EACH_TEST_METHOD)
class LikeServiceTest {

  val USER_LOGIN = "login"

  val USER_ID = 123

  @Autowired
  var likeService: LikeService = _

  @Autowired
  var context: ApplicationContext = _

  @MockBean
  var uaaClient: UaaClient = _

  @Before
  def init(): Unit = {
    when(this.uaaClient.getUserIdByLogin(USER_LOGIN)).thenReturn(USER_ID)
    when(this.uaaClient.getUserLoginById(USER_ID)).thenReturn(USER_LOGIN)
    val factory = this.context.getAutowireCapableBeanFactory
    factory.autowireBean(this.uaaClient)
    factory.initializeBean(this.uaaClient, "uaaClient")
  }

  @Test
  def whenInsertLikeAndGetIt(): Unit = {
    val (resourceType, resourceId, userLogin) = ("type", 1, USER_LOGIN)
    this.likeService.saveOrRemove(resourceType, resourceId, userLogin)
    val result = this.likeService.getAll(resourceType, resourceId).get(0)
    Assert.assertEquals(resourceType, result.resourceType)
    Assert.assertEquals(resourceId, result.resourceId)
    Assert.assertEquals(USER_LOGIN, result.userLogin)
  }

  @Test
  def whenInsertLikeAndRemoveIt(): Unit = {
    val (resourceType, resourceId, userLogin) = ("type", 2, USER_LOGIN)
    this.likeService.saveOrRemove(resourceType, resourceId, userLogin)
    this.likeService.saveOrRemove(resourceType, resourceId, userLogin)
    val result = this.likeService.getAll(resourceType, resourceId)
    Assert.assertTrue(result.isEmpty)
  }

  @Test
  def whenInsertLikesAndGetOnlyForFirstUser(): Unit = {
    val (resourceType, firstResourceId, secondResourceId, userLogin) = ("type", 3, 4, USER_LOGIN)
    this.likeService.saveOrRemove(resourceType, firstResourceId, userLogin)
    this.likeService.saveOrRemove(resourceType, secondResourceId, userLogin)
    val userLikes = this.likeService.getAll(userLogin)
    Assert.assertEquals(2, userLikes.size)
    Assert.assertEquals(USER_LOGIN, userLikes.get(0).userLogin)
    Assert.assertEquals(USER_LOGIN, userLikes.get(1).userLogin)
  }
}
