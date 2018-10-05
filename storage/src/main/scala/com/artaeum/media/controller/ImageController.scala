package com.artaeum.media.controller

import java.io.IOException

import com.artaeum.media.controller.error.{InternalServerException, NotFoundException}
import com.artaeum.media.service.ImageService
import org.springframework.core.io.Resource
import org.springframework.http.{HttpStatus, ResponseEntity}
import org.springframework.web.bind.annotation._
import org.springframework.web.multipart.MultipartFile

@RestController
@RequestMapping(Array("/images"))
class ImageController(imageService: ImageService) {

  @GetMapping(Array("/{resource}/{name:.+}"))
  def get(@PathVariable resource: String, @PathVariable name: String): ResponseEntity[Resource] = {
    val image = this.imageService.load(resource, name)
    if (!image.exists) throw new NotFoundException
    new ResponseEntity[Resource](image, HttpStatus.OK)
  }

  @PostMapping(Array("/{resource}"))
  def save(@RequestParam("image") image: MultipartFile,
           @PathVariable resource: String,
           @RequestParam("imageName") name: String): Unit = {
    this.imageService.save(image, resource, name)
  }

  @DeleteMapping(Array("/{resource}/{name:.+}"))
  def delete(@PathVariable resource: String, @PathVariable name: String): Unit = {
    this.imageService.delete(resource, name)
  }

  @ExceptionHandler(Array(classOf[IOException]))
  def handleIOException(): Unit = throw new InternalServerException
}
