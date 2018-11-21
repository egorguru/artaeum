package com.artaeum.uaa.security;

import com.artaeum.uaa.domain.User;
import com.artaeum.uaa.dto.UserRegister;
import com.artaeum.uaa.repository.UserRepository;
import com.artaeum.uaa.service.UserService;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.context.junit4.SpringRunner;

import static org.junit.Assert.assertEquals;

@RunWith(SpringRunner.class)
@SpringBootTest
@DirtiesContext(classMode = DirtiesContext.ClassMode.BEFORE_EACH_TEST_METHOD)
public class ArtaeumUserDetailsServiceTest {

    @Autowired
    private ArtaeumUserDetailsService artaeumUserDetailsService;

    @Autowired
    private UserService userService;

    @Autowired
    private UserRepository userRepository;

    @Test
    public void whenLoadExistingUser() {
        UserRegister user = new UserRegister();
        user.setEmail("test@email.com");
        user.setLogin("testlogin");
        user.setFirstName("First");
        user.setLastName("Last");
        user.setPassword("password");
        user.setLangKey("en");
        this.userService.register(user);
        User editUser = this.userService.getByLogin(user.getLogin()).get();
        editUser.setActivated(true);
        this.userRepository.save(editUser);
        String userId = this.userService.getByLogin(user.getLogin()).get().getId();
        assertEquals(this.artaeumUserDetailsService.loadUserByUsername("testlogin").getUsername(), userId);
        assertEquals(this.artaeumUserDetailsService.loadUserByUsername("test@email.com").getUsername(), userId);
    }
}
