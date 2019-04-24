package com.artaeum.profile.controller;

import com.artaeum.profile.domain.Subscription;
import com.artaeum.profile.repository.SubscriptionRepository;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import javax.transaction.Transactional;
import java.util.Collections;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@RunWith(SpringRunner.class)
@SpringBootTest
@DirtiesContext(classMode = DirtiesContext.ClassMode.BEFORE_EACH_TEST_METHOD)
public class SubscriptionControllerTest {

    private static final String FIRST_USER_ID = "uuid-123";

    private static final String SECOND_USER_ID = "uuid-321";

    @Autowired
    private SubscriptionRepository subscriptionRepository;

    @Autowired
    private SubscriptionController subscriptionController;

    private MockMvc mockMvc;

    @Before
    public void init() {
        this.mockMvc = MockMvcBuilders
                .standaloneSetup(this.subscriptionController)
                .build();
    }

    @Test
    public void whenSubscribeAndGetIt() throws Exception {
        this.mockMvc.perform(post("/subscriptions/subscribe")
                .content(FIRST_USER_ID)
                .principal(new UsernamePasswordAuthenticationToken(
                        SECOND_USER_ID, "password", Collections.emptyList())))
                .andExpect(status().isOk());
        Subscription result = this.subscriptionRepository.findAll().get(0);
        assertEquals(FIRST_USER_ID, result.getProfileId());
        assertEquals(SECOND_USER_ID, result.getSubscriberId());
    }

    @Test
    public void whenSubscribeToYourself() throws Exception {
        this.mockMvc.perform(post("/subscriptions/subscribe")
                .content(FIRST_USER_ID)
                .principal(new UsernamePasswordAuthenticationToken(
                        FIRST_USER_ID, "password", Collections.emptyList())))
                .andExpect(status().isBadRequest());
    }

    @Test
    @Transactional
    public void whenSubscribeAndUnsubscribe() throws Exception {
        this.mockMvc.perform(post("/subscriptions/subscribe")
                .content(FIRST_USER_ID)
                .principal(new UsernamePasswordAuthenticationToken(
                        SECOND_USER_ID, "password", Collections.emptyList())))
                .andExpect(status().isOk());
        this.mockMvc.perform(post("/subscriptions/unsubscribe")
                .content(FIRST_USER_ID)
                .principal(new UsernamePasswordAuthenticationToken(
                        SECOND_USER_ID, "password", Collections.emptyList())))
                .andExpect(status().isOk());
        assertTrue(this.subscriptionRepository.findAll().isEmpty());
    }

    @Test
    public void whenSubscribeAndGetAllBySubscriber() throws Exception {
        this.mockMvc.perform(post("/subscriptions/subscribe")
                .content(FIRST_USER_ID)
                .principal(new UsernamePasswordAuthenticationToken(
                        SECOND_USER_ID, "password", Collections.emptyList())))
                .andExpect(status().isOk());
        this.mockMvc.perform(get("/subscriptions/subscriptions?profileId={profileId}", SECOND_USER_ID))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.[0].profileId").value(FIRST_USER_ID));
    }

    @Test
    public void whenSubscribeAndGetAllByProfile() throws Exception {
        this.mockMvc.perform(post("/subscriptions/subscribe")
                .content(FIRST_USER_ID)
                .principal(new UsernamePasswordAuthenticationToken(
                        SECOND_USER_ID, "password", Collections.emptyList())))
                .andExpect(status().isOk());
        this.mockMvc.perform(get("/subscriptions/subscribers?profileId={profileId}", FIRST_USER_ID))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.[0].subscriberId").value(SECOND_USER_ID));
    }

    @Test
    public void whenSubscribeAndGetThisSubscription() throws Exception {
        this.mockMvc.perform(post("/subscriptions/subscribe")
                .content(FIRST_USER_ID)
                .principal(new UsernamePasswordAuthenticationToken(
                        SECOND_USER_ID, "password", Collections.emptyList())))
                .andExpect(status().isOk());
        this.mockMvc.perform(get("/subscriptions/my?profileId={profileId}", FIRST_USER_ID)
                .principal(new UsernamePasswordAuthenticationToken(
                        SECOND_USER_ID, "password", Collections.emptyList())))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.subscriberId").value(SECOND_USER_ID));
    }

    @Test
    public void whenGetSubscriptionIfNotSubscribed() throws Exception {
        this.mockMvc.perform(get("/subscriptions/my?profileId={profileId}", FIRST_USER_ID)
                .principal(new UsernamePasswordAuthenticationToken(
                        SECOND_USER_ID, "password", Collections.emptyList())))
                .andExpect(status().isNotFound());
    }
}
