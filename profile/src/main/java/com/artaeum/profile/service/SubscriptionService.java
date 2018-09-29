package com.artaeum.profile.service;

import com.artaeum.profile.domain.Subscription;
import com.artaeum.profile.repository.SubscriptionRepository;
import org.springframework.stereotype.Service;

import java.time.ZonedDateTime;
import java.util.List;

@Service
public class SubscriptionService {

    private SubscriptionRepository subscriptionRepository;

    public SubscriptionService(SubscriptionRepository subscriptionRepository) {
        this.subscriptionRepository = subscriptionRepository;
    }

    public void subscribe(Long profile, Long subscriber) {
        if (!this.subscriptionRepository.findByProfileIdAndSubscriberId(profile, subscriber).isPresent()) {
            this.subscriptionRepository.save(new Subscription(profile, subscriber, ZonedDateTime.now()));
        }
    }

    public void unsubscribe(Long profile, Long subscriber) {
        this.subscriptionRepository.deleteByProfileIdAndSubscriberId(profile, subscriber);
    }

    public List<Subscription> getAllSubscriptions(Long subscriber) {
        return this.subscriptionRepository.findAllBySubscriberId(subscriber);
    }

    public List<Subscription> getAllSubscribers(Long profile) {
        return this.subscriptionRepository.findAllByProfileId(profile);
    }
}
