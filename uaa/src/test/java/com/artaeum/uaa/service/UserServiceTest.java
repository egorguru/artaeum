package com.artaeum.uaa.service;

import com.artaeum.uaa.config.Constants;
import com.artaeum.uaa.domain.User;
import com.artaeum.uaa.dto.UserRegister;
import com.artaeum.uaa.repository.AuthorityRepository;
import com.artaeum.uaa.repository.UserRepository;
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.Random;

@RunWith(SpringRunner.class)
@SpringBootTest
@DirtiesContext(classMode = DirtiesContext.ClassMode.BEFORE_EACH_TEST_METHOD)
public class UserServiceTest {

    private Random random = new Random();

    @Autowired
    private UserService userService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AuthorityRepository authorityRepository;

    @Test
    public void whenCreateUserThenGetIt() {
        UserRegister user = new UserRegister();
        user.setLogin("testlogin");
        user.setEmail("test@email.com");
        user.setPassword("password");
        this.userService.register(user);
        User result = this.userRepository.findOneWithAuthoritiesByLogin("testlogin").get();
        Assert.assertEquals(result.getLogin(), user.getLogin());
        Assert.assertEquals(result.getLogin(), user.getLogin());
        Assert.assertTrue(result.getAuthorities().contains(this.authorityRepository.findById(Constants.USER_AUTHORITY).get()));
    }
}
