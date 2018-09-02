package com.artaeum.media.config

import com.mongodb.MongoClient
import cz.jirutka.spring.embedmongo.EmbeddedMongoBuilder
import org.springframework.context.annotation.Configuration
import org.springframework.core.env.Environment
import org.springframework.data.mongodb.config.AbstractMongoConfiguration

@Configuration
class MongoConfig(env: Environment) extends AbstractMongoConfiguration {

  override def mongoClient(): MongoClient = {
    new EmbeddedMongoBuilder()
      .version("3.6.0")
      .bindIp("127.0.0.1")
      .port(12345)
      .build()
  }

  override def getDatabaseName: String = "test_db"
}
