package com.artaeum.media.controller

import java.time.Instant
import java.util.Collections

import com.artaeum.media.domain.Like
import com.artaeum.media.repository.LikeRepository
import com.fasterxml.jackson.databind.ObjectMapper
import com.netflix.discovery.EurekaClient
import org.hamcrest.Matchers.hasItem
import org.junit.runner.RunWith
import org.junit.{Assert, Before, Test}
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.boot.test.mock.mockito.MockBean
import org.springframework.http.MediaType
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

  @MockBean
  var eurekaClient: EurekaClient = _

  val USER_ID = "uuid-123"

  val objectMapper = new ObjectMapper()

  @Autowired
  var likeController: LikeController = _

  @Autowired
  var likeRepository: LikeRepository = _

  var mockMvc: MockMvc = _

  @Before
  def init(): Unit = this.mockMvc = MockMvcBuilders.standaloneSetup(this.likeController).build()

  @Test
  def whenAddLike(): Unit = {
    val like = new Like("type", 1L, null, null)
    this.mockMvc.perform(post("/likes")
      .principal(new UsernamePasswordAuthenticationToken(
        USER_ID, "password", Collections.emptyList[SimpleGrantedAuthority]))
      .content(this.objectMapper.writeValueAsBytes(like))
      .contentType(MediaType.APPLICATION_JSON))
      .andExpect(status().isOk)
    val result = this.likeRepository.findAllByResourceTypeAndResourceId(like.resourceType, like.resourceId)
    Assert.assertEquals(1, result.size)
    Assert.assertEquals(like.resourceType, result.get(0).resourceType)
    Assert.assertEquals(like.resourceId, result.get(0).resourceId)
    Assert.assertEquals(USER_ID, result.get(0).userId)
  }

  @Test
  def whenAddLikeAndRemoveIt(): Unit = {
    val like = new Like("type", 2L, null, null)
    this.mockMvc.perform(post("/likes")
      .principal(new UsernamePasswordAuthenticationToken(
        USER_ID, "password", Collections.emptyList[SimpleGrantedAuthority]))
      .content(this.objectMapper.writeValueAsBytes(like))
      .contentType(MediaType.APPLICATION_JSON))
      .andExpect(status().isOk)
    val beforeRemove = this.likeRepository.findAllByResourceTypeAndResourceId(like.resourceType, like.resourceId)
    Assert.assertFalse(beforeRemove.isEmpty)
    this.mockMvc.perform(post("/likes")
      .principal(new UsernamePasswordAuthenticationToken(
        USER_ID, "password", Collections.emptyList[SimpleGrantedAuthority]))
      .content(this.objectMapper.writeValueAsBytes(like))
      .contentType(MediaType.APPLICATION_JSON))
      .andExpect(status().isOk)
    val afterRemove = this.likeRepository.findAllByResourceTypeAndResourceId(like.resourceType, like.resourceId)
    Assert.assertTrue(afterRemove.isEmpty)
  }

  @Test
  def whenGetAllByUser(): Unit = {
    val like = new Like("type", 3L, USER_ID, Instant.now())
    this.likeRepository.insert(like)
    this.mockMvc.perform(get("/likes?userId={userId}", USER_ID))
      .andExpect(status().isOk)
      .andExpect(jsonPath("$.[*].resourceType").value(hasItem(like.resourceType)))
      .andExpect(jsonPath("$.[*].resourceId").value(hasItem(like.resourceId.toInt)))
      .andExpect(jsonPath("$.[*].userId").value(hasItem(USER_ID)))
  }

  @Test
  def whenGetAllByResource(): Unit = {
    val like = new Like("type", 4L, USER_ID, Instant.now())
    this.likeRepository.insert(like)
    val urlTemplate = "/likes?resourceType={resourceType}&resourceId={resourceId}"
    this.mockMvc.perform(get(urlTemplate, like.resourceType, String.valueOf(like.resourceId)))
      .andExpect(status().isOk)
      .andExpect(jsonPath("$.[*].resourceType").value(hasItem(like.resourceType)))
      .andExpect(jsonPath("$.[*].resourceId").value(hasItem(like.resourceId.toInt)))
      .andExpect(jsonPath("$.[*].userId").value(hasItem(USER_ID)))
  }
}
