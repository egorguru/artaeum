package com.artaeum.profile.repository;

import com.artaeum.profile.domain.Subscription;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface SubscriptionRepository extends JpaRepository<Subscription, Long> {

    Optional<Subscription> findByProfileIdAndSubscriberId(Long profileId, Long subscriberId);

    List<Subscription> findAllByProfileId(Long profileId);

    List<Subscription> findAllBySubscriberId(Long subscriberId);

    void deleteByProfileIdAndSubscriberId(Long profileId, Long subscriberId);
}
