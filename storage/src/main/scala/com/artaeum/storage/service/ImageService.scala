package com.artaeum.storage.service

import java.io.{ByteArrayInputStream, File, FileOutputStream}
import java.net.URI
import java.nio.file.{Files, Paths}
import java.util.Base64

import com.artaeum.storage.config.Config
import com.artaeum.storage.model.Image
import javax.imageio.{IIOImage, ImageIO, ImageWriteParam}

object ImageService {

  Config
    .get("artaeum.resources")
    .split(",")
    .foreach(r => Files.createDirectories(Paths.get(r)))

  val DEFAULT_IMAGE_EXPANSION = "jpg"

  def load(resource: String, name: String): File = new File(Paths.get(resource, name).toUri)

  def save(image: Image, resource: String): Unit = {
    val path = Paths.get(resource, String.format("%s.%s", image.name, DEFAULT_IMAGE_EXPANSION)).toUri
    val bytes = Base64.getDecoder.decode(image.file.split(",")(1))
    ImageIO.write(ImageIO.read(new ByteArrayInputStream(bytes)), DEFAULT_IMAGE_EXPANSION, new File(path))
    this.compress(path)
  }

  def delete(resource: String, name: String): Unit = Files.delete(Paths.get(resource, name))

  private def compress(uri: URI): Unit = {
    val image = new File(uri)
    val bufferedImage = ImageIO.read(image)

    val fos = new FileOutputStream(image)
    val ios = ImageIO.createImageOutputStream(fos)
    val writer = ImageIO.getImageWritersByFormatName(DEFAULT_IMAGE_EXPANSION).next
    writer.setOutput(ios)

    val param = writer.getDefaultWriteParam
    param.setCompressionMode(ImageWriteParam.MODE_EXPLICIT)
    param.setCompressionQuality(0.5f)

    writer.write(null, new IIOImage(bufferedImage, null, null), param)

    fos.close()
    ios.close()
  }
}
