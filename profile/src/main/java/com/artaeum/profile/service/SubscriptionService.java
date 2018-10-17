package com.artaeum.profile.service;

import com.artaeum.profile.domain.Subscription;
import com.artaeum.profile.repository.SubscriptionRepository;
import org.springframework.stereotype.Service;

import java.time.ZonedDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class SubscriptionService {

    private SubscriptionRepository subscriptionRepository;

    public SubscriptionService(SubscriptionRepository subscriptionRepository) {
        this.subscriptionRepository = subscriptionRepository;
    }

    public void subscribe(String profile, String subscriber) {
        if (!this.subscriptionRepository.findByProfileIdAndSubscriberId(profile, subscriber).isPresent()) {
            this.subscriptionRepository.save(new Subscription(profile, subscriber, ZonedDateTime.now()));
        }
    }

    public void unsubscribe(String profile, String subscriber) {
        this.subscriptionRepository.deleteByProfileIdAndSubscriberId(profile, subscriber);
    }

    public Optional<Subscription> getByProfileIdAndUserId(String profileId, String userId) {
        return this.subscriptionRepository.findByProfileIdAndSubscriberId(profileId, userId);
    }

    public List<Subscription> getAllSubscriptions(String subscriber) {
        return this.subscriptionRepository.findAllBySubscriberId(subscriber);
    }

    public List<Subscription> getAllSubscribers(String profile) {
        return this.subscriptionRepository.findAllByProfileId(profile);
    }
}
