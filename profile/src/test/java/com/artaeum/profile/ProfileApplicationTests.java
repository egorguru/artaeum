package com.artaeum.profile;

import com.artaeum.profile.client.UaaClient;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.junit4.SpringRunner;

@RunWith(SpringRunner.class)
@SpringBootTest
public class ProfileApplicationTests {

    @MockBean
    private UaaClient uaaClient;

    @Test
    public void contextLoads() {}
}
