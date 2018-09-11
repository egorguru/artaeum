package com.artaeum.profile.controller;

import com.artaeum.profile.controller.error.BadRequestException;
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
        if (profile.equals(principal.getName())) {
            throw new BadRequestException("You can't subscribe to yourself");
        }
        this.subscriptionService.subscribe(profile, principal.getName());
    }

    @PostMapping("/unsubscribe")
    public void unsubscribe(@RequestBody String profile, Principal principal) {
        this.subscriptionService.unsubscribe(profile, principal.getName());
    }

    @GetMapping("/{login}")
    public List<String> getAllSubscriptionsByLogin(@PathVariable String login) {
        return this.subscriptionService.getAllSubscriptions(login);
    }

    @GetMapping("/{login}/subscribers")
    public List<String> getAllSubscribersByLogin(@PathVariable String login) {
        return this.subscriptionService.getAllSubscribers(login);
    }
}
