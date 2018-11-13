package com.artaeum.media

import org.springframework.boot.SpringApplication
import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.cloud.client.discovery.EnableDiscoveryClient

@SpringBootApplication
@EnableDiscoveryClient
class MediaApplication

object MediaApplication extends App {
  SpringApplication.run(classOf[MediaApplication], args: _*)
}
