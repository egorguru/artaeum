package com.artaeum.storage.task

import colossus.core.Context
import colossus.core.ProxyActor.Receive
import colossus.util.Task
import com.artaeum.storage.config.Config
import click.rashad.eureka.client.EurekaService

class EurekaTask(context: Context) extends Task(context) {

  var eureka: EurekaService = _

  override def run(): Unit = {
    val port = Config.get("port")
    this.eureka = EurekaService(
      "http://registry:8761/eureka/",
      "storage",
      "storage:storage:%s".format(port),
      "STORAGE",
      "127.0.0.1",
      port.toInt
    )
  }

  override def receive: Receive = null
}
