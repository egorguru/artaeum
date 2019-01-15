package com.artaeum.media.service

import java.nio.file.{Files, Paths}
import java.util.Base64

import org.junit.runner.RunWith
import org.junit.{After, Assert, Test}
import org.springframework.beans.factory.annotation.{Autowired, Value}
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.core.io.Resource
import org.springframework.test.context.junit4.SpringRunner

@RunWith(classOf[SpringRunner])
@SpringBootTest
class ImageServiceTest {

  val START_OF_BASE64 = "data:image/png;base64,"

  val TEST_RESOURCE = "testResource"

  val TEST_NAME_WITHOUT_EXPANSION = "test"

  val TEST_NAME: String = TEST_NAME_WITHOUT_EXPANSION + ".jpg"

  @Autowired
  var imageService: ImageService = _

  @Value("classpath:image.png")
  var imagePNG: Resource = _

  @Test
  def whenSaveImageAndGetCompressedImage(): Unit = {
    val originImage = this.imagePNG.getFile
    val base64Image = this.START_OF_BASE64 + Base64.getEncoder
      .encodeToString(
        Files.readAllBytes(Paths.get(originImage.getPath))
      )
    this.imageService.save(base64Image, TEST_RESOURCE, TEST_NAME_WITHOUT_EXPANSION)
    val compressedImage = this.imageService.load(TEST_RESOURCE, TEST_NAME)
    Assert.assertTrue(originImage.length() > compressedImage.length())
  }

  @After
  def clear(): Unit = {
    val path = Paths.get(TEST_RESOURCE, TEST_NAME)
    if (Files.exists(path)) Files.delete(path)
  }
}
