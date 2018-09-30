package com.artaeum.uaa.repository;

import com.artaeum.uaa.domain.User;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.ZonedDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, String> {

    @EntityGraph(attributePaths = "authorities")
    Optional<User> findOneWithAuthoritiesByLogin(String login);

    @EntityGraph(attributePaths = "authorities")
    Optional<User> findOneWithAuthoritiesByEmail(String email);

    Optional<User> findByLogin(String login);

    Optional<User> findByEmail(String email);

    Optional<User> findByActivationKey(String key);

    Optional<User> findByResetKey(String key);

    List<User> findAllByActivatedIsFalseAndRegisterDateBefore(ZonedDateTime time);

    void deleteByLogin(String login);
}