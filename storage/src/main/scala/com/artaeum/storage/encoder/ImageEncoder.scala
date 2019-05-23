package com.artaeum.storage.encoder

import java.io.File
import java.nio.file.Files

import colossus.protocols.http.{HttpBody, HttpBodyEncoder}

class ImageEncoder extends HttpBodyEncoder[File] {
  override def encode(data: File): HttpBody = new HttpBody(Files.readAllBytes(data.toPath))
  override def contentType: String = "image/jpeg"
}
