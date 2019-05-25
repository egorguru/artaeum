package com.artaeum.storage.handler

import java.io.File

import colossus.core.ServerContext
import colossus.protocols.http.HttpMethod.{Delete, Get, Post}
import colossus.protocols.http.UrlParsing.{/, Root, on}
import colossus.protocols.http.{ContentType, Http, HttpBodyDecoder, HttpBodyEncoder, RequestHandler}
import colossus.service.Callback
import colossus.service.GenRequestHandler.PartialHandler
import com.artaeum.storage.decoder.ImageDecoder
import com.artaeum.storage.encoder.ImageEncoder
import com.artaeum.storage.model.Image
import com.artaeum.storage.service.ImageService

import scala.util.{Failure, Success}

class Handler(ctx: ServerContext) extends RequestHandler(ctx) {

  implicit val imageEncoder: HttpBodyEncoder[File] = new ImageEncoder
  implicit val fileEntityDecoder: HttpBodyDecoder[Image] = new ImageDecoder

  override def handle: PartialHandler[Http] = {
    case req @ Get on Root / "storage" / "health" =>
      Callback.successful(req
        .ok("""{"status":"UP"}""")
        .withContentType(ContentType.ApplicationJson))
    case req @ Get on Root / "storage" / "images" / resource / name =>
      val image = ImageService.load(resource, name)
      if (image.exists) {
        Callback.successful(req.ok(image))
      } else {
        Callback.successful(req
          .notFound("""{"error":"Not Found"}""")
          .withContentType(ContentType.ApplicationJson))
      }
    case req @ Post on Root / "storage" / "images" / resource =>
      req.body.as[Image] match {
        case Success(image) =>
          ImageService.save(image, resource)
          Callback.successful(req.ok("OK"))
        case Failure(_) => Callback.successful(req
          .notFound("""{"error":"Bad Request"}""")
          .withContentType(ContentType.ApplicationJson))
      }
    case req @ Delete on Root / "storage" / "images" / resource / name =>
      ImageService.delete(resource, name)
      Callback.successful(req
        .ok("""{"message":"OK"}"""")
        .withContentType(ContentType.ApplicationJson))
  }
}
