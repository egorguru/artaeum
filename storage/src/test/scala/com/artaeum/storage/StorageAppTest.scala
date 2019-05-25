package com.artaeum.storage

import java.nio.file.{Files, Paths}
import java.util.Base64

import colossus.core.{ServerContext, ServerRef}
import colossus.protocols.http.{HttpBody, HttpCodes, HttpRequest, HttpServer, Initializer}
import colossus.testkit.HttpServiceSpec
import com.artaeum.storage.config.Config
import com.artaeum.storage.handler.Handler
import com.artaeum.storage.model.Image
import com.artaeum.storage.service.ImageService
import com.github.plokhotnyuk.jsoniter_scala.core.{JsonValueCodec, writeToArray}
import com.github.plokhotnyuk.jsoniter_scala.macros.{CodecMakerConfig, JsonCodecMaker}
import org.scalatest.BeforeAndAfterEach

class StorageAppTest extends HttpServiceSpec with BeforeAndAfterEach {

  val TEST_RESOURCE = "testResource"
  val TEST_NAME_WITHOUT_EXPANSION = "uuid-avatar"
  val TEST_NAME: String = TEST_NAME_WITHOUT_EXPANSION + ".jpg"
  val BASE64_PNG_IMAGE_PREFIX = "data:image/png;base64,"
  val IMAGE_PNG_NAME = "image.png"

  implicit val codec: JsonValueCodec[Image] = JsonCodecMaker.make[Image](CodecMakerConfig())

  override def service: ServerRef = {
    HttpServer.start("StorageTest", Config.get("port").toInt) { initContext =>
      new Initializer(initContext) {
        override def onConnect: ServerContext => Handler = { serverContext =>
          new Handler(serverContext)
        }
      }
    }
  }

  override def afterEach(): Unit = {
    val path = Paths.get(TEST_RESOURCE, TEST_NAME)
    if (Files.exists(path)) Files.delete(path)
  }

  "Health Status" must {
    "return 200 and json body with health status" in {
      expectCodeAndBody(HttpRequest.get("/storage/health"), HttpCodes.OK,"""{"status":"UP"}""")
    }
  }

  "Images API" must {
    "return 404 and json body with message" in {
      expectCodeAndBody(
        HttpRequest.get(s"/storage/images/$TEST_RESOURCE/$TEST_NAME"),
        HttpCodes.NOT_FOUND,
        """{"error":"Not Found"}"""
      )
    }
    "return 200 and jpg image" in {
      ImageService.save(Image(this.getImageInBase64, TEST_NAME_WITHOUT_EXPANSION), TEST_RESOURCE)
      expectCodeAndBodyPredicate(HttpRequest.get(s"/storage/images/$TEST_RESOURCE/$TEST_NAME"), HttpCodes.OK) {
        body => body.length > 0
      }
    }
    "return 200" in {
      val jsonImageEntityBytes = writeToArray(Image(this.getImageInBase64, TEST_NAME_WITHOUT_EXPANSION))
      val request = HttpRequest
        .post(s"/storage/images/$TEST_RESOURCE")
        .withBody(new HttpBody(jsonImageEntityBytes))
      expectCodeAndBodyPredicate(request, HttpCodes.OK) { body =>
        Files.exists(Paths.get(TEST_RESOURCE, TEST_NAME))
      }
    }
  }

  private def getImageInBase64: String = this.BASE64_PNG_IMAGE_PREFIX +
      Base64.getEncoder.encodeToString(
        Files.readAllBytes(
          Paths.get(
            this.getClass.getClassLoader.getResource(this.IMAGE_PNG_NAME).toURI)))
}
