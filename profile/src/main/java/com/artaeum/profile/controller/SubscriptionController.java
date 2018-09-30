package com.artaeum.profile.controller;

import com.artaeum.profile.controller.error.BadRequestException;
import com.artaeum.profile.domain.Subscription;
import com.artaeum.profile.service.SubscriptionService;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/subscriptions")
public class SubscriptionController {

    private SubscriptionService subscriptionService;

    public SubscriptionController(SubscriptionService subscriptionService) {
        this.subscriptionService = subscriptionService;
    }

    @PostMapping("/subscribe")
    public void subscribe(@RequestBody String profile, Principal principal) {
        String currentUser = principal.getName();
        if (profile.equals(currentUser)) {
            throw new BadRequestException("You can't subscribe to yourself");
        }
        this.subscriptionService.subscribe(profile, currentUser);
    }

    @PostMapping("/unsubscribe")
    public void unsubscribe(@RequestBody String profile, Principal principal) {
        this.subscriptionService.unsubscribe(profile, principal.getName());
    }

    @GetMapping("/{userId}")
    public List<Subscription> getAllSubscriptionsByLogin(@PathVariable String userId) {
        return this.subscriptionService.getAllSubscriptions(userId);
    }

    @GetMapping("/{userId}/subscribers")
    public List<Subscription> getAllSubscribersByLogin(@PathVariable String userId) {
        return this.subscriptionService.getAllSubscribers(userId);
    }
}
