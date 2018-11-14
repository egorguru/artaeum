package com.artaeum.media.controller

import java.io.IOException
import java.nio.file.Files

import com.artaeum.media.controller.error.{InternalServerException, NotFoundException}
import com.artaeum.media.service.ImageService
import javax.activation.FileTypeMap
import org.springframework.http.{MediaType, ResponseEntity}
import org.springframework.web.bind.annotation._

@RestController
@RequestMapping(Array("/images"))
class ImageController(imageService: ImageService) {

  @GetMapping(Array("/{resource}/{name:.+}"))
  def get(@PathVariable resource: String, @PathVariable name: String): ResponseEntity[Array[Byte]] = {
    val image = this.imageService.load(resource, name)
    if (!image.exists) throw new NotFoundException
    ResponseEntity.ok()
      .contentLength(image.length())
      .contentType(MediaType.valueOf(FileTypeMap.getDefaultFileTypeMap.getContentType(image)))
      .body(Files.readAllBytes(image.toPath))
  }

  @PostMapping(Array("/{resource}"))
  def save(@RequestParam image: String,
           @PathVariable resource: String,
           @RequestParam name: String): Unit = {
    this.imageService.save(image, resource, name)
  }

  @DeleteMapping(Array("/{resource}/{name:.+}"))
  def delete(@PathVariable resource: String, @PathVariable name: String): Unit = {
    this.imageService.delete(resource, name)
  }

  @ExceptionHandler(Array(classOf[IOException]))
  def handleIOException(): Unit = throw new InternalServerException
}
