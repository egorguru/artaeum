package com.artaeum.profile.service;

import com.artaeum.profile.domain.Subscription;
import com.artaeum.profile.repository.SubscriptionRepository;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.transaction.annotation.Transactional;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;

@RunWith(SpringRunner.class)
@SpringBootTest
@DirtiesContext(classMode = DirtiesContext.ClassMode.BEFORE_EACH_TEST_METHOD)
public class SubscriptionServiceTest {

    private static final String FIRST_USER_ID = "uuid-123";

    private static final String SECOND_USER_ID = "uuid-321";

    @Autowired
    private SubscriptionRepository subscriptionRepository;

    @Autowired
    private SubscriptionService subscriptionService;

    @Test
    public void whenSubscribe() {
        this.subscriptionService.subscribe(FIRST_USER_ID, SECOND_USER_ID);
        Subscription result = this.subscriptionRepository.findAll().get(0);
        assertEquals(FIRST_USER_ID, result.getProfileId());
        assertEquals(SECOND_USER_ID, result.getSubscriberId());
    }

    @Test
    @Transactional
    public void whenSubscribeAndThenUnsubscribe() {
        this.subscriptionService.subscribe(FIRST_USER_ID, SECOND_USER_ID);
        this.subscriptionService.unsubscribe(FIRST_USER_ID, SECOND_USER_ID);
        assertTrue(this.subscriptionRepository.findAll().isEmpty());
    }

    @Test
    public void whenSubscribeAndThenGetIt() {
        this.subscriptionService.subscribe(FIRST_USER_ID, SECOND_USER_ID);
        Subscription subscriber = this.subscriptionService.getAllSubscribers(FIRST_USER_ID).get(0);
        assertEquals(SECOND_USER_ID, subscriber.getSubscriberId());
        Subscription subProfile = this.subscriptionService.getAllSubscriptions(SECOND_USER_ID).get(0);
        assertEquals(FIRST_USER_ID, subProfile.getProfileId());
    }
}
