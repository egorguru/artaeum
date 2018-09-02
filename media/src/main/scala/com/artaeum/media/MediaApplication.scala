package com.artaeum.media

import org.springframework.boot.SpringApplication
import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.cloud.client.discovery.EnableDiscoveryClient
import org.springframework.data.mongodb.repository.config.EnableReactiveMongoRepositories
import org.springframework.security.oauth2.config.annotation.web.configuration.EnableOAuth2Client

@SpringBootApplication
@EnableReactiveMongoRepositories
@EnableDiscoveryClient
@EnableOAuth2Client
class MediaApplication

object MediaApplication extends App {
  SpringApplication.run(classOf[MediaApplication], args: _*)
}
