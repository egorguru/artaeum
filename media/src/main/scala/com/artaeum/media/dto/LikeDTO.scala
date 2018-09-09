package com.artaeum.media.dto

import scala.beans.BeanProperty

class LikeDTO(@BeanProperty val resourceType: String,
              @BeanProperty val resourceId: Long,
              @BeanProperty val userLogin: String)
