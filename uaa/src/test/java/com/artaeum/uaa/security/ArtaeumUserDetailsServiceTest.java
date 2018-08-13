package com.artaeum.uaa.security;

import com.artaeum.uaa.dto.UserRegister;
import com.artaeum.uaa.service.UserService;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import static org.junit.Assert.assertEquals;

@RunWith(SpringRunner.class)
@SpringBootTest
public class ArtaeumUserDetailsServiceTest {

    @Autowired
    private ArtaeumUserDetailsService artaeumUserDetailsService;

    @Autowired
    private UserService userService;

    @Test
    public void whenLoadExistingUser() {
        UserRegister user = new UserRegister();
        user.setEmail("test@email.com");
        user.setLogin("testLogin");
        user.setPassword("password");
        this.userService.create(user);
        assertEquals(this.artaeumUserDetailsService.loadUserByUsername("testlogin").getUsername(), user.getEmail());
        assertEquals(this.artaeumUserDetailsService.loadUserByUsername("test@email.com").getUsername(), user.getEmail());
    }
}
