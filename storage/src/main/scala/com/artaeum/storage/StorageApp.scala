package com.artaeum.storage

import akka.actor.ActorSystem
import colossus.core._
import colossus.protocols.http._
import colossus.util.Task
import com.artaeum.storage.config.Config
import com.artaeum.storage.handler.Handler
import com.artaeum.storage.task.EurekaTask

object StorageApp extends App {

  implicit val actorSystem: ActorSystem = ActorSystem()
  implicit val ioSystem: IOSystem = IOSystem()

  Task.start(ctx => new EurekaTask(ctx))

  HttpServer.start("Storage", Config.get("port").toInt)(initContext => new Initializer(initContext) {
    override def onConnect: RequestHandlerFactory = serverContext => new Handler(serverContext)
  })
}
