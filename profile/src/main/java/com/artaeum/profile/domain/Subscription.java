package com.artaeum.profile.domain;

import javax.persistence.*;
import java.time.ZonedDateTime;

@Entity
@Table(name = "subscriptions")
public class Subscription {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "profile_id", nullable = false)
    private String profileId;

    @Column(name = "subscriber_id", nullable = false)
    private String subscriberId;

    @Column(name = "created_date", nullable = false)
    private ZonedDateTime createdDate;

    public Subscription() {}

    public Subscription(String profileId, String subscriberId, ZonedDateTime createdDate) {
        this.profileId = profileId;
        this.subscriberId = subscriberId;
        this.createdDate = createdDate;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getProfileId() {
        return profileId;
    }

    public void setProfileId(String profileId) {
        this.profileId = profileId;
    }

    public String getSubscriberId() {
        return subscriberId;
    }

    public void setSubscriberId(String subscriberId) {
        this.subscriberId = subscriberId;
    }

    public ZonedDateTime getCreatedDate() {
        return createdDate;
    }

    public void setCreatedDate(ZonedDateTime createdDate) {
        this.createdDate = createdDate;
    }
}
