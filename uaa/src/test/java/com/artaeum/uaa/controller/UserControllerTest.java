package com.artaeum.uaa.controller;

import com.artaeum.uaa.domain.User;
import com.artaeum.uaa.repository.UserRepository;
import org.apache.commons.lang.RandomStringUtils;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import java.time.ZonedDateTime;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@RunWith(SpringRunner.class)
@SpringBootTest
@DirtiesContext(classMode = DirtiesContext.ClassMode.BEFORE_EACH_TEST_METHOD)
public class UserControllerTest {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserController userController;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    private MockMvc mockMvc;

    @Before
    public void init() {
        this.mockMvc = MockMvcBuilders
                .standaloneSetup(this.userController)
                .setCustomArgumentResolvers(this.pageableArgumentResolver)
                .build();
    }

    @Test
    @Transactional
    public void whenGetAllUsers() throws Exception {
        User user = this.createUser();
        this.mockMvc.perform(get("/users?sort=id,desc")
                .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.[0].login").value(user.getLogin()))
                .andExpect(jsonPath("$.[0].firstName").value(user.getFirstName()))
                .andExpect(jsonPath("$.[0].lastName").value(user.getLastName()))
                .andExpect(jsonPath("$.[0].email").value(user.getEmail()))
                .andExpect(jsonPath("$.[0].langKey").value(user.getLangKey()));
    }

    @Test
    public void whenGetUserByLogin() throws Exception {
        User user = this.createUser();
        this.mockMvc.perform(get("/users/{login}", user.getLogin())
                .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.login").value(user.getLogin()))
                .andExpect(jsonPath("$.firstName").value(user.getFirstName()))
                .andExpect(jsonPath("$.lastName").value(user.getLastName()))
                .andExpect(jsonPath("$.email").value(user.getEmail()))
                .andExpect(jsonPath("$.langKey").value(user.getLangKey()));
    }

    @Test
    public void whenGetNotExistingUser() throws Exception {
        this.mockMvc.perform(get("/api/users/unknown"))
                .andExpect(status().isNotFound());
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
        user.setActivated(true);
        return this.userRepository.save(user);
    }
}
