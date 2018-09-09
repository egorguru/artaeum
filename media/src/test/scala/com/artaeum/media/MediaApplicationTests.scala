package com.artaeum.media

import com.artaeum.media.client.UaaClient
import org.junit.Test
import org.junit.runner.RunWith
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.boot.test.mock.mockito.MockBean
import org.springframework.test.context.junit4.SpringRunner

@RunWith(classOf[SpringRunner])
@SpringBootTest
class MediaApplicationTests {

  @MockBean var uaaClient: UaaClient = _

  @Test
  def loadContext(): Unit = {}
}
