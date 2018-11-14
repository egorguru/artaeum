package com.artaeum.media.controller

import java.nio.file.{Files, Paths}
import java.util.Base64

import org.junit.runner.RunWith
import org.junit.{After, Before, Test}
import org.springframework.beans.factory.annotation.{Autowired, Value}
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.core.io.Resource
import org.springframework.http.MediaType
import org.springframework.security.test.context.support.WithMockUser
import org.springframework.test.context.junit4.SpringRunner
import org.springframework.test.web.servlet.MockMvc
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders.{delete, get, post}
import org.springframework.test.web.servlet.result.MockMvcResultMatchers.{content, status}
import org.springframework.test.web.servlet.setup.MockMvcBuilders

@RunWith(classOf[SpringRunner])
@SpringBootTest
class ImageControllerTest {

  val TEST_RESOURCE = "testResource"

  val TEST_NAME_WITHOUT_EXPANSION = "uuid-avatar"

  val TEST_NAME: String = TEST_NAME_WITHOUT_EXPANSION + ".jpg"

  val START_OF_BASE64 = "data:image/png;base64,"

  @Value("classpath:image.png")
  var imagePNG: Resource = _

  @Autowired
  var imageController: ImageController = _

  var mockMvc: MockMvc = _

  @Before
  def init(): Unit = this.mockMvc = MockMvcBuilders.standaloneSetup(this.imageController).build

  @Test
  def whenGetNotExistingImage(): Unit = {
    this.mockMvc
      .perform(get("/images/{resource}/testtest.jpg", TEST_RESOURCE))
      .andExpect(status.isNotFound)
  }

  @Test
  @WithMockUser
  def whenUploadImageAndGetIt(): Unit = {
    this.mockMvc.perform(post("/images/{resource}", TEST_RESOURCE)
      .param("image", this.getImage())
      .param("name", TEST_NAME_WITHOUT_EXPANSION))
      .andExpect(status.isOk)
    this.mockMvc.perform(get("/images/{resource}/{name}", TEST_RESOURCE, TEST_NAME))
      .andExpect(status.isOk)
      .andExpect(content.contentType(MediaType.IMAGE_JPEG))
  }

  @Test
  @WithMockUser
  def whenUploadImageAndDeleteItAndGetIt(): Unit = {
    this.mockMvc.perform(post("/images/{resource}", TEST_RESOURCE)
      .param("image", this.getImage())
      .param("name", TEST_NAME_WITHOUT_EXPANSION))
      .andExpect(status.isOk)
    this.mockMvc.perform(delete("/images/{resource}/{name}", TEST_RESOURCE, TEST_NAME))
    this.mockMvc.perform(get("/images/{resource}/{name}", TEST_RESOURCE, TEST_NAME))
      .andExpect(status.isNotFound)
  }

  @After
  def clear(): Unit = {
    val path = Paths.get(TEST_RESOURCE, TEST_NAME)
    if (Files.exists(path)) Files.delete(path)
  }

  private def getImage(): String = {
    this.START_OF_BASE64 + Base64.getEncoder
      .encodeToString(
        Files.readAllBytes(Paths.get(this.imagePNG.getURI))
      )
  }
}
