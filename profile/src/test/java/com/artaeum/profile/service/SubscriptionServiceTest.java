package com.artaeum.profile.service;

import com.artaeum.profile.client.UaaClient;
import com.artaeum.profile.domain.Subscription;
import com.artaeum.profile.repository.SubscriptionRepository;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.transaction.annotation.Transactional;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;
import static org.mockito.Mockito.when;

@RunWith(SpringRunner.class)
@SpringBootTest
@DirtiesContext(classMode = DirtiesContext.ClassMode.BEFORE_EACH_TEST_METHOD)
public class SubscriptionServiceTest {

    private static final String FIRST_USER_LOGIN = "first_login";
    private static final Long FIRST_USER_ID = 123L;

    private static final String SECOND_USER_LOGIN = "second_login";
    private static final Long SECOND_USER_ID = 321L;

    @Autowired
    private SubscriptionRepository subscriptionRepository;

    @Autowired
    private SubscriptionService subscriptionService;

    @MockBean
    private UaaClient uaaClient;

    @Before
    public void init() {
        when(this.uaaClient.getUserIdByLogin(FIRST_USER_LOGIN)).thenReturn(FIRST_USER_ID);
        when(this.uaaClient.getUserLoginById(FIRST_USER_ID)).thenReturn(FIRST_USER_LOGIN);
        when(this.uaaClient.getUserIdByLogin(SECOND_USER_LOGIN)).thenReturn(SECOND_USER_ID);
        when(this.uaaClient.getUserLoginById(SECOND_USER_ID)).thenReturn(SECOND_USER_LOGIN);
    }

    @Test
    public void whenSubscribe() {
        this.subscriptionService.subscribe(FIRST_USER_LOGIN, SECOND_USER_LOGIN);
        Subscription result = this.subscriptionRepository.findAll().get(0);
        assertEquals(FIRST_USER_ID, result.getProfileId());
        assertEquals(SECOND_USER_ID, result.getSubscriberId());
    }

    @Test
    @Transactional
    public void whenSubscribeAndThenUnsubscribe() {
        this.subscriptionService.subscribe(FIRST_USER_LOGIN, SECOND_USER_LOGIN);
        this.subscriptionService.unsubscribe(FIRST_USER_LOGIN, SECOND_USER_LOGIN);
        assertTrue(this.subscriptionRepository.findAll().isEmpty());
    }

    @Test
    public void whenSubscribeAndThenGetIt() {
        this.subscriptionService.subscribe(FIRST_USER_LOGIN, SECOND_USER_LOGIN);
        String subscriber = this.subscriptionService.getAllSubscribers(FIRST_USER_LOGIN).get(0);
        assertEquals(SECOND_USER_LOGIN, subscriber);
        String subProfile = this.subscriptionService.getAllSubscriptions(SECOND_USER_LOGIN).get(0);
        assertEquals(FIRST_USER_LOGIN, subProfile);
    }
}
