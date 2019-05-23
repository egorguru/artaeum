package com.artaeum.storage

import java.io.File

import akka.actor.ActorSystem
import colossus.core._
import colossus.protocols.http.HttpMethod.{Delete, Get, Post}
import colossus.protocols.http.UrlParsing.{/, Root, on}
import colossus.protocols.http._
import colossus.service.Callback
import colossus.service.GenRequestHandler.PartialHandler
import com.artaeum.storage.config.Config
import com.artaeum.storage.decoder.ImageDecoder
import com.artaeum.storage.encoder.ImageEncoder
import com.artaeum.storage.model.Image
import com.artaeum.storage.service.ImageService

import scala.util.{Failure, Success}

object StorageApp extends App {

  implicit val actorSystem: ActorSystem = ActorSystem()
  implicit val ioSystem: IOSystem = IOSystem()

  implicit val imageEncoder: HttpBodyEncoder[File] = new ImageEncoder
  implicit val fileEntityDecoder: HttpBodyDecoder[Image] = new ImageDecoder

  HttpServer.start("Storage", Config.get("port").toInt)(initContext => new Initializer(initContext) {
    override def onConnect: RequestHandlerFactory = serverContext => new RequestHandler(serverContext) {
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
  })
}
