package com.artaeum.uaa.controller;

import com.artaeum.uaa.config.Constants;
import com.artaeum.uaa.domain.User;
import com.artaeum.uaa.dto.UserDTO;
import com.artaeum.uaa.repository.AuthorityRepository;
import com.artaeum.uaa.repository.UserRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.apache.commons.lang.RandomStringUtils;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import java.security.Principal;
import java.time.ZonedDateTime;
import java.util.Collections;
import java.util.HashSet;
import java.util.Set;

import static org.junit.Assert.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@RunWith(SpringRunner.class)
@SpringBootTest
@DirtiesContext(classMode = DirtiesContext.ClassMode.BEFORE_EACH_TEST_METHOD)
public class UserControllerTest {

    private ObjectMapper objectMapper = new ObjectMapper();

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AuthorityRepository authorityRepository;

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
    @Transactional
    public void whenGetUserById() throws Exception {
        User user = this.createUser();
        this.mockMvc.perform(get("/users/{id}", user.getId())
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

    @Test
    @Transactional
    public void whenUpdateUser() throws Exception {
        User user = this.createUser();
        UserDTO userDTO = new UserDTO();
        userDTO.setId(user.getId());
        userDTO.setLogin("newlogin");
        userDTO.setEmail("newemail@test");
        Set<String> authorities = new HashSet<>();
        authorities.add(Constants.USER_AUTHORITY);
        authorities.add(Constants.MODERATOR_AUTHORITY);
        userDTO.setAuthorities(authorities);
        userDTO.setFirstName("newfirstname");
        userDTO.setLastName("newlastname");
        userDTO.setLangKey("ru");
        Principal principal = new UsernamePasswordAuthenticationToken("123", "password",
                Collections.singletonList(new SimpleGrantedAuthority(Constants.ADMIN_AUTHORITY)));
        this.mockMvc.perform(put("/users")
                .principal(principal)
                .contentType(MediaType.APPLICATION_JSON)
                .content(this.objectMapper.writeValueAsBytes(userDTO)))
                .andExpect(status().isOk());
        User result = this.userRepository.getOne(user.getId());
        assertEquals(userDTO.getLogin(), result.getLogin());
        assertEquals(userDTO.getEmail(), result.getEmail());
        assertEquals(user.getFirstName(), result.getFirstName());
        assertEquals(user.getLastName(), result.getLastName());
        assertEquals(user.getLangKey(), result.getLangKey());
        assertTrue(result.getAuthorities().contains(this.authorityRepository.findById(Constants.USER_AUTHORITY).get()));
        assertTrue(result.getAuthorities().contains(this.authorityRepository.findById((Constants.MODERATOR_AUTHORITY)).get()));
    }

    @Test
    @Transactional
    public void whenDeleteUser() throws Exception {
        User user = this.createUser();
        Principal principal = new UsernamePasswordAuthenticationToken("123", "password",
                Collections.singletonList(new SimpleGrantedAuthority(Constants.ADMIN_AUTHORITY)));
        assertTrue(this.userRepository.findByLogin(user.getLogin()).isPresent());
        this.mockMvc.perform(delete("/users/{login}", user.getLogin())
                .principal(principal));
        assertFalse(this.userRepository.findByLogin(user.getLogin()).isPresent());
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
        user.getAuthorities().add(this.authorityRepository.findById(Constants.USER_AUTHORITY).get());
        return this.userRepository.save(user);
    }
}
