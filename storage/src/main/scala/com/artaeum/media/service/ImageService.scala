package com.artaeum.media.service

import java.io.File
import java.nio.file.{Files, Paths}

import com.artaeum.media.config.Constants
import javax.annotation.PostConstruct
import javax.imageio.ImageIO
import org.springframework.core.env.Environment
import org.springframework.core.io.{Resource, UrlResource}
import org.springframework.stereotype.Service
import org.springframework.web.multipart.MultipartFile

@Service
class ImageService(env: Environment) {

  @PostConstruct
  def createDirs(): Unit = {
    this.env.getProperty("artaeum.resources", classOf[Array[String]])
      .foreach(r => Files.createDirectories(Paths.get(r)))
  }

  def load(resource: String, name: String): Resource = new UrlResource(Paths.get(resource, name).toUri)

  def save(file: MultipartFile, resource: String, name: String): Unit = {
    val path = Paths.get(resource, String.format("%s.%s", name, Constants.DEFAULT_IMAGE_EXPANSION)).toUri
    ImageIO.write(ImageIO.read(file.getInputStream), Constants.DEFAULT_IMAGE_EXPANSION, new File(path))
  }

  def delete(resource: String, name: String): Unit = Files.delete(Paths.get(resource, name))
}
