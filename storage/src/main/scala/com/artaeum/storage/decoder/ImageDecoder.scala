package com.artaeum.storage.decoder

import colossus.protocols.http.HttpBodyDecoder
import com.artaeum.storage.model.Image
import com.github.plokhotnyuk.jsoniter_scala.core.{JsonValueCodec, readFromArray}
import com.github.plokhotnyuk.jsoniter_scala.macros.{CodecMakerConfig, JsonCodecMaker}

import scala.util.Try

class ImageDecoder extends HttpBodyDecoder[Image] {

  implicit val codec: JsonValueCodec[Image] = JsonCodecMaker.make[Image](CodecMakerConfig())

  override def decode(body: Array[Byte]): Try[Image] = Try(readFromArray[Image](body))
}
