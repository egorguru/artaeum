package com.artaeum.storage.config

import java.util.Properties

object Config {

  private val props = new Properties()

  {
    val is = Config.getClass.getClassLoader.getResourceAsStream("config.properties")
    this.props.load(is)
    is.close()
  }

  def get(key: String): String = this.props.getProperty(key)
}
