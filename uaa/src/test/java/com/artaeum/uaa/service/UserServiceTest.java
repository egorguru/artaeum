package com.artaeum.uaa.service;

import com.artaeum.uaa.config.Constants;
import com.artaeum.uaa.domain.User;
import com.artaeum.uaa.dto.UserRegister;
import com.artaeum.uaa.repository.AuthorityRepository;
import com.artaeum.uaa.repository.UserRepository;
import org.apache.commons.lang.RandomStringUtils;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.context.junit4.SpringRunner;

import java.time.ZonedDateTime;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.Optional;

import static org.junit.Assert.*;

@RunWith(SpringRunner.class)
@SpringBootTest
@DirtiesContext(classMode = DirtiesContext.ClassMode.BEFORE_EACH_TEST_METHOD)
public class UserServiceTest {

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
        user.setLangKey("en");
        this.userService.register(user);
        User result = this.userRepository.findOneWithAuthoritiesByLogin("testlogin").get();
        assertEquals(result.getLogin(), user.getLogin());
        assertEquals(result.getLogin(), user.getLogin());
        assertTrue(result.getAuthorities().contains(this.authorityRepository.findById(Constants.USER_AUTHORITY).get()));
    }

    @Test
    public void whenRequestForPasswordResetForActivatedUser() {
        User expected = this.createUser();
        expected.setActivated(true);
        this.userRepository.save(expected);
        User result = this.userService.requestPasswordReset(expected.getEmail()).get();
        assertNotNull(result);
        assertEquals(expected.getEmail(), result.getEmail());
        assertNotNull(result.getResetKey());
    }

    @Test
    public void whenNotActivatedUserSendRequestPasswordReset() {
        User user = this.createUser();
        Optional<User> result = this.userService.requestPasswordReset(user.getEmail());
        assertFalse(result.isPresent());
    }

    @Test
    public void whenSendValidPasswordResetKey() {
        User user = this.createUser();
        user.setActivated(true);
        user.setResetKey("12345678910111213141");
        this.userRepository.save(user);
        Optional<User> result = this.userService.completePasswordReset("testtest", user.getResetKey());
        assertTrue(result.isPresent());
    }

    @Test
    public void whenFindNotActivatedUsers() {
        ZonedDateTime now = ZonedDateTime.now();
        User user = this.createUser();
        user.setRegisterDate(now.minus(4, ChronoUnit.DAYS));
        this.userRepository.save(user);
        List<User> users = this.userRepository.findAllByActivatedIsFalseAndRegisterDateBefore(now.minus(3, ChronoUnit.DAYS));
        assertFalse(users.isEmpty());
        this.userService.removeNotActivatedUsers();
        users = userRepository.findAllByActivatedIsFalseAndRegisterDateBefore(now.minus(3, ChronoUnit.DAYS));
        assertTrue(users.isEmpty());
    }

    @Test
    public void whenRemoveNotActivatedUsers() {
        User user = this.createUser();
        user.setRegisterDate(ZonedDateTime.now().minus(30, ChronoUnit.DAYS));
        this.userRepository.save(user);
        assertTrue(this.userRepository.findByLogin("testtest").isPresent());
        this.userService.removeNotActivatedUsers();
        assertFalse(this.userRepository.findByLogin("testtest").isPresent());
    }

    private User createUser() {
        User user = new User();
        user.setLogin("testtest");
        user.setPassword(RandomStringUtils.random(60));
        user.setEmail("test@test");
        user.setFirstName("test");
        user.setLastName("test");
        user.setRegisterDate(ZonedDateTime.now());
        user.setLangKey("en");
        return this.userRepository.save(user);
    }
}
