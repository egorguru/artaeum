package com.artaeum.profile.service;

import com.artaeum.profile.client.UaaClient;
import com.artaeum.profile.domain.Subscription;
import com.artaeum.profile.repository.SubscriptionRepository;
import org.springframework.stereotype.Service;

import java.time.ZonedDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class SubscriptionService {

    private SubscriptionRepository subscriptionRepository;

    private UaaClient uaaClient;

    public SubscriptionService(SubscriptionRepository subscriptionRepository, UaaClient uaaClient) {
        this.subscriptionRepository = subscriptionRepository;
        this.uaaClient = uaaClient;
    }

    public void subscribe(String profile, String subscriber) {
        Long profileId = this.getUserId(profile);
        Long subscriberId = this.getUserId(subscriber);
        if (!this.subscriptionRepository.findByProfileIdAndSubscriberId(profileId, subscriberId).isPresent()) {
            this.subscriptionRepository.save(new Subscription(profileId, subscriberId, ZonedDateTime.now()));
        }
    }

    public void unsubscribe(String profile, String subscriber) {
        Long profileId = this.getUserId(profile);
        Long subscriberId = this.getUserId(subscriber);
        this.subscriptionRepository.deleteByProfileIdAndSubscriberId(profileId, subscriberId);
    }

    public List<String> getAllSubscriptions(String subscriber) {
        return this.subscriptionRepository
                .findAllBySubscriberId(this.getUserId(subscriber)).stream()
                .map(s -> this.getUserLogin(s.getProfileId()))
                .collect(Collectors.toList());
    }

    public List<String> getAllSubscribers(String profile) {
        return this.subscriptionRepository
                .findAllByProfileId(this.getUserId(profile)).stream()
                .map(s -> this.getUserLogin(s.getSubscriberId()))
                .collect(Collectors.toList());
    }

    private Long getUserId(String login) {
        return this.uaaClient.getUserIdByLogin(login);
    }

    private String getUserLogin(Long login) {
        return this.uaaClient.getUserLoginById(login);
    }
}
