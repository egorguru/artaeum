package com.artaeum.storage.task

import colossus.core.Context
import colossus.core.ProxyActor.Receive
import colossus.util.Task
import com.artaeum.storage.config.Config
import me.albinus.eureka.client.EurekaService

class EurekaTask(context: Context) extends Task(context) {

  var eureka: EurekaService = _

  override def run(): Unit = {
    this.eureka = EurekaService(
      "http://localhost:8761/eureka/",
      "storage",
      "storage-1",
      "STORAGE",
      "127.0.0.1",
      Config.get("port").toInt
    )
  }

  override def receive: Receive = null
}
