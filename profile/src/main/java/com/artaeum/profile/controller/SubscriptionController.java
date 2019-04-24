package com.artaeum.profile.controller;

import com.artaeum.profile.controller.error.BadRequestException;
import com.artaeum.profile.controller.error.NotFoundException;
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

    @GetMapping("/my")
    public Subscription getSubscription(@RequestParam(value = "profileId") String profileId, Principal principal) {
        return this.subscriptionService
                .getByProfileIdAndUserId(profileId, principal.getName())
                .orElseThrow(NotFoundException::new);
    }

    @GetMapping("/subscriptions")
    public List<Subscription> getAllSubscriptionsByProfileId(@RequestParam(value = "profileId") String profileId) {
        return this.subscriptionService.getAllSubscriptions(profileId);
    }

    @GetMapping("/subscribers")
    public List<Subscription> getAllSubscribersByProfileId(@PathVariable(value = "profileId") String profileId) {
        return this.subscriptionService.getAllSubscribers(profileId);
    }
}
