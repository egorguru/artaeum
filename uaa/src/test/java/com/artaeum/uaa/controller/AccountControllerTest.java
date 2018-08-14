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
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@RunWith(SpringRunner.class)
@SpringBootTest
@DirtiesContext(classMode = DirtiesContext.ClassMode.BEFORE_EACH_TEST_METHOD)
public class AccountControllerTest {

    private ObjectMapper mapper = new ObjectMapper();

    @Autowired
    private AccountController accountController;

    private MockMvc mockMvc;

    @Before
    public void init() {
        this.mockMvc = MockMvcBuilders.standaloneSetup(accountController).build();
    }

    @Test
    public void whenCreateValidUserThenSuccess() throws Exception {
        UserRegister user = new UserRegister();
        user.setEmail("test@email.com");
        user.setLogin("testlogin");
        user.setPassword("password");
        user.setLangKey("en");
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
        user.setLangKey("en");
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
        user.setLangKey("en");
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
        user.setLangKey("en");
        String json = mapper.writeValueAsString(user);
        mockMvc.perform(post("/register")
                .contentType(MediaType.APPLICATION_JSON).content(json))
                .andExpect(status().isBadRequest());
    }

    @Test
    public void whenGetPrincipal() throws Exception {
        mockMvc.perform(get("/account/current")
                .principal(new UserPrincipal("test")))
                .andExpect(jsonPath("$.name").value("test"))
                .andExpect(status().isOk());
    }

    @Test
    public void whenChangePassword() throws Exception {
        mockMvc.perform(post("/account/change-password").content("password"))
                .andExpect(status().isOk());
    }
}
