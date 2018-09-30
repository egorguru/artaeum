package com.artaeum.profile.repository;

import com.artaeum.profile.domain.Subscription;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface SubscriptionRepository extends JpaRepository<Subscription, Long> {

    Optional<Subscription> findByProfileIdAndSubscriberId(String profileId, String subscriberId);

    List<Subscription> findAllByProfileId(String profileId);

    List<Subscription> findAllBySubscriberId(String subscriberId);

    void deleteByProfileIdAndSubscriberId(String profileId, String subscriberId);
}
