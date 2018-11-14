package com.artaeum.media.service

import java.io.{ByteArrayInputStream, File}
import java.nio.file.{Files, Paths}
import java.util.Base64

import com.artaeum.media.config.Constants
import javax.annotation.PostConstruct
import javax.imageio.ImageIO
import org.springframework.core.env.Environment
import org.springframework.stereotype.Service

@Service
class ImageService(env: Environment) {

  @PostConstruct
  def createDirs(): Unit = {
    this.env.getProperty("artaeum.resources", classOf[Array[String]])
      .foreach(r => Files.createDirectories(Paths.get(r)))
  }

  def load(resource: String, name: String): File = new File(Paths.get(resource, name).toUri)

  def save(image: String, resource: String, name: String): Unit = {
    val path = Paths.get(resource, String.format("%s.%s", name, Constants.DEFAULT_IMAGE_EXPANSION)).toUri
    val bytes = Base64.getDecoder.decode(image.split(",")(1))
    ImageIO.write(ImageIO.read(new ByteArrayInputStream(bytes)), Constants.DEFAULT_IMAGE_EXPANSION, new File(path))
  }

  def delete(resource: String, name: String): Unit = Files.delete(Paths.get(resource, name))
}
