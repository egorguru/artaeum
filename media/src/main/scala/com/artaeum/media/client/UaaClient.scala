package com.artaeum.media.client

import org.springframework.cloud.openfeign.FeignClient
import org.springframework.web.bind.annotation.{GetMapping, PathVariable}

@FeignClient(name = "uaa")
trait UaaClient {

  @GetMapping(Array("/uaa/users/id/{login}"))
  def getUserIdByLogin(@PathVariable login: String): Long

  @GetMapping(Array("/uaa/users/login/{id}"))
  def getUserLoginById(@PathVariable id: Long): String
}
