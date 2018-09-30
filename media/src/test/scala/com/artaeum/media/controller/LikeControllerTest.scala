package com.artaeum.media.controller

import java.time.Instant
import java.util.Collections

import com.artaeum.media.domain.Like
import com.artaeum.media.repository.LikeRepository
import org.hamcrest.Matchers.hasItem
import org.junit.runner.RunWith
import org.junit.{Assert, Before, Test}
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken
import org.springframework.security.core.authority.SimpleGrantedAuthority
import org.springframework.test.annotation.DirtiesContext
import org.springframework.test.context.junit4.SpringRunner
import org.springframework.test.web.servlet.MockMvc
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders.{get, post}
import org.springframework.test.web.servlet.result.MockMvcResultMatchers.{jsonPath, status}
import org.springframework.test.web.servlet.setup.MockMvcBuilders

@RunWith(classOf[SpringRunner])
@SpringBootTest
@DirtiesContext(classMode = DirtiesContext.ClassMode.BEFORE_EACH_TEST_METHOD)
class LikeControllerTest {

  val USER_ID = "uuid-123"

  @Autowired
  var likeController: LikeController = _

  @Autowired
  var likeRepository: LikeRepository = _

  var mockMvc: MockMvc = _

  @Before
  def init(): Unit = this.mockMvc = MockMvcBuilders.standaloneSetup(this.likeController).build()

  @Test
  def whenAddLike(): Unit = {
    val (resourceType, resourceId) = ("type", 1)
    this.mockMvc.perform(post("/{resourceType}/{resourceId}/likes", resourceType, String.valueOf(resourceId))
      .principal(new UsernamePasswordAuthenticationToken(
        USER_ID, "password", Collections.emptyList[SimpleGrantedAuthority])))
      .andExpect(status().isOk)
    val result = this.likeRepository.findAllByResourceTypeAndResourceId(resourceType, resourceId)
    Assert.assertEquals(1, result.size)
    Assert.assertEquals(resourceType, result.get(0).resourceType)
    Assert.assertEquals(resourceId, result.get(0).resourceId)
    Assert.assertEquals(USER_ID, result.get(0).userId)
  }

  @Test
  def whenAddLikeAndRemoveIt(): Unit = {
    val (resourceType, resourceId) = ("type", 2)
    this.mockMvc.perform(post("/{resourceType}/{resourceId}/likes", resourceType, String.valueOf(resourceId))
      .principal(new UsernamePasswordAuthenticationToken(
        USER_ID, "password", Collections.emptyList[SimpleGrantedAuthority])))
      .andExpect(status().isOk)
    val beforeRemove = this.likeRepository.findAllByResourceTypeAndResourceId(resourceType, resourceId)
    Assert.assertFalse(beforeRemove.isEmpty)
    this.mockMvc.perform(post("/{resourceType}/{resourceId}/likes", resourceType, String.valueOf(resourceId))
      .principal(new UsernamePasswordAuthenticationToken(
        USER_ID, "password", Collections.emptyList[SimpleGrantedAuthority])))
      .andExpect(status().isOk)
    val afterRemove = this.likeRepository.findAllByResourceTypeAndResourceId(resourceType, resourceId)
    Assert.assertTrue(afterRemove.isEmpty)
  }

  @Test
  def whenGetAllForUser(): Unit = {
    val like = new Like
    like.setResourceType("type")
    like.setResourceId(3)
    like.setUserId(USER_ID)
    like.setCreatedDate(Instant.now())
    this.likeRepository.insert(like)
    this.mockMvc.perform(get("/{userId}/likes", USER_ID))
      .andExpect(status().isOk)
      .andExpect(jsonPath("$.[*].resourceType").value(hasItem(like.resourceType)))
      .andExpect(jsonPath("$.[*].resourceId").value(hasItem(like.resourceId.toInt)))
      .andExpect(jsonPath("$.[*].userId").value(hasItem(USER_ID)))
  }

  @Test
  def whenGetAllForResource(): Unit = {
    val like = new Like
    like.setResourceType("type")
    like.setResourceId(4)
    like.setUserId(USER_ID)
    like.setCreatedDate(Instant.now())
    this.likeRepository.insert(like)
    this.mockMvc.perform(get("/{resourceType}/{resourceId}/likes", like.resourceType, String.valueOf(like.resourceId)))
      .andExpect(status().isOk)
      .andExpect(jsonPath("$.[*].resourceType").value(hasItem(like.resourceType)))
      .andExpect(jsonPath("$.[*].resourceId").value(hasItem(like.resourceId.toInt)))
      .andExpect(jsonPath("$.[*].userId").value(hasItem(USER_ID)))
  }
}
