package com.artaeum.media

import org.springframework.boot.SpringApplication
import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.cloud.client.discovery.EnableDiscoveryClient
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories
import org.springframework.scheduling.annotation.EnableScheduling
import org.springframework.security.oauth2.config.annotation.web.configuration.EnableOAuth2Client

@SpringBootApplication
@EnableDiscoveryClient
@EnableOAuth2Client
@EnableMongoRepositories
@EnableScheduling
class MediaApplication

object MediaApplication extends App {
  SpringApplication.run(classOf[MediaApplication], args: _*)
}
