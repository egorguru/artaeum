package com.artaeum.uaa.controller;

import com.artaeum.uaa.dto.UserRegister;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.sun.security.auth.UserPrincipal;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@RunWith(SpringRunner.class)
@SpringBootTest
public class UserControllerTest {

    private ObjectMapper mapper = new ObjectMapper();

    @Autowired
    private UserController userController;

    private MockMvc mockMvc;

    @Before
    public void init() {
        this.mockMvc = MockMvcBuilders.standaloneSetup(userController).build();
    }

    @Test
    public void whenCreateValidUserThenSuccess() throws Exception {
        UserRegister user = new UserRegister();
        user.setEmail("test@email.com");
        user.setLogin("testlogin");
        user.setPassword("password");
        String json = mapper.writeValueAsString(user);
        mockMvc.perform(post("/register")
                .contentType(MediaType.APPLICATION_JSON).content(json))
                .andExpect(status().isCreated());
    }

    @Test
    public void whenCreateUserWithInvalidLoginThenThrowException() throws Exception {
        UserRegister user = new UserRegister();
        user.setEmail("test@email.com");
        user.setLogin("ba");
        user.setPassword("password");
        String json = mapper.writeValueAsString(user);
        mockMvc.perform(post("/register")
                .contentType(MediaType.APPLICATION_JSON).content(json))
                .andExpect(status().isBadRequest());
    }

    @Test
    public void whenCreateUserWithInvalidEmailThenThrowException() throws Exception {
        UserRegister user = new UserRegister();
        user.setEmail("testemail");
        user.setLogin("testlogin");
        user.setPassword("password");
        String json = mapper.writeValueAsString(user);
        mockMvc.perform(post("/register")
                .contentType(MediaType.APPLICATION_JSON).content(json))
                .andExpect(status().isBadRequest());
    }

    @Test
    public void whenCreateUserWithInvalidPasswordThenThrowException() throws Exception {
        UserRegister user = new UserRegister();
        user.setEmail("test@email.com");
        user.setLogin("testlogin");
        user.setPassword("pass1");
        String json = mapper.writeValueAsString(user);
        mockMvc.perform(post("/register")
                .contentType(MediaType.APPLICATION_JSON).content(json))
                .andExpect(status().isBadRequest());
    }

    @Test
    public void whenGetPrincipal() throws Exception {
        mockMvc.perform(get("/users/current")
                .principal(new UserPrincipal("test")))
                .andExpect(jsonPath("$.name").value("test"))
                .andExpect(status().isOk());
    }
}
