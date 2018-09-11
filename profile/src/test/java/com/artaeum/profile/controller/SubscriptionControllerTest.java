package com.artaeum.profile.controller;

import com.artaeum.profile.client.UaaClient;
import com.artaeum.profile.domain.Subscription;
import com.artaeum.profile.repository.SubscriptionRepository;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import javax.transaction.Transactional;
import java.util.Collections;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@RunWith(SpringRunner.class)
@SpringBootTest
@DirtiesContext(classMode = DirtiesContext.ClassMode.BEFORE_EACH_TEST_METHOD)
public class SubscriptionControllerTest {

    private static final String FIRST_USER_LOGIN = "first_login";
    private static final Long FIRST_USER_ID = 123L;

    private static final String SECOND_USER_LOGIN = "second_login";
    private static final Long SECOND_USER_ID = 321L;

    @Autowired
    private SubscriptionRepository subscriptionRepository;

    @Autowired
    private SubscriptionController subscriptionController;

    @MockBean
    private UaaClient uaaClient;

    private MockMvc mockMvc;

    @Before
    public void init() {
        when(this.uaaClient.getUserIdByLogin(FIRST_USER_LOGIN)).thenReturn(FIRST_USER_ID);
        when(this.uaaClient.getUserLoginById(FIRST_USER_ID)).thenReturn(FIRST_USER_LOGIN);
        when(this.uaaClient.getUserIdByLogin(SECOND_USER_LOGIN)).thenReturn(SECOND_USER_ID);
        when(this.uaaClient.getUserLoginById(SECOND_USER_ID)).thenReturn(SECOND_USER_LOGIN);
        this.mockMvc = MockMvcBuilders
                .standaloneSetup(this.subscriptionController)
                .build();
    }

    @Test
    public void whenSubscribeAndGetIt() throws Exception {
        this.mockMvc.perform(post("/subscriptions/subscribe")
                .content(FIRST_USER_LOGIN)
                .principal(new UsernamePasswordAuthenticationToken(
                        SECOND_USER_LOGIN, "password", Collections.emptyList())))
                .andExpect(status().isOk());
        Subscription result = this.subscriptionRepository.findAll().get(0);
        assertEquals(FIRST_USER_ID, result.getProfileId());
        assertEquals(SECOND_USER_ID, result.getSubscriberId());
    }

    @Test
    public void whenSubscribeToYourself() throws Exception {
        this.mockMvc.perform(post("/subscriptions/subscribe")
                .content(FIRST_USER_LOGIN)
                .principal(new UsernamePasswordAuthenticationToken(
                        FIRST_USER_LOGIN, "password", Collections.emptyList())))
                .andExpect(status().isBadRequest());
    }

    @Test
    @Transactional
    public void whenSubscribeAndUnsubscribe() throws Exception {
        this.mockMvc.perform(post("/subscriptions/subscribe")
                .content(FIRST_USER_LOGIN)
                .principal(new UsernamePasswordAuthenticationToken(
                        SECOND_USER_LOGIN, "password", Collections.emptyList())))
                .andExpect(status().isOk());
        this.mockMvc.perform(post("/subscriptions/unsubscribe")
                .content(FIRST_USER_LOGIN)
                .principal(new UsernamePasswordAuthenticationToken(
                        SECOND_USER_LOGIN, "password", Collections.emptyList())))
                .andExpect(status().isOk());
        assertTrue(this.subscriptionRepository.findAll().isEmpty());
    }

    @Test
    public void whenSubscribeAndGetAllForSubscriber() throws Exception {
        this.mockMvc.perform(post("/subscriptions/subscribe")
                .content(FIRST_USER_LOGIN)
                .principal(new UsernamePasswordAuthenticationToken(
                        SECOND_USER_LOGIN, "password", Collections.emptyList())))
                .andExpect(status().isOk());
        this.mockMvc.perform(get("/subscriptions/{login}", SECOND_USER_LOGIN))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.[0]").value(FIRST_USER_LOGIN));
    }

    @Test
    public void whenSubscribeAndGetAllByProfile() throws Exception {
        this.mockMvc.perform(post("/subscriptions/subscribe")
                .content(FIRST_USER_LOGIN)
                .principal(new UsernamePasswordAuthenticationToken(
                        SECOND_USER_LOGIN, "password", Collections.emptyList())))
                .andExpect(status().isOk());
        this.mockMvc.perform(get("/subscriptions/{login}/subscribers", FIRST_USER_LOGIN))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.[0]").value(SECOND_USER_LOGIN));
    }
}
