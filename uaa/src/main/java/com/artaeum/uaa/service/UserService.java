package com.artaeum.uaa.service;

import com.artaeum.uaa.config.Constants;
import com.artaeum.uaa.domain.User;
import com.artaeum.uaa.dto.UserRegister;
import com.artaeum.uaa.repository.AuthorityRepository;
import com.artaeum.uaa.repository.UserRepository;
import com.artaeum.uaa.security.SecurityUtils;
import org.apache.commons.lang.RandomStringUtils;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.ZonedDateTime;
import java.time.temporal.ChronoUnit;
import java.util.Optional;

@Service
public class UserService {

    private static final int RESET_KEY_SIZE = 20;

    private UserRepository userRepository;

    private AuthorityRepository authorityRepository;

    private PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository, AuthorityRepository authorityRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.authorityRepository = authorityRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public User register(UserRegister user) {
        User newUser = new User();
        newUser.setLogin(user.getLogin());
        newUser.setEmail(user.getEmail());
        newUser.setPassword(this.passwordEncoder.encode(user.getPassword()));
        this.authorityRepository.findById(Constants.USER_AUTHORITY)
                .ifPresent(authority -> newUser.getAuthorities().add(authority));
        return this.userRepository.save(newUser);
    }

    public Optional<User> activateRegistration(String key) {
        return this.userRepository.findByActivationKey(key)
                .map(user -> {
                    user.setActivated(true);
                    user.setActivationKey(null);
                    return user;
                });
    }

    public Optional<User> getCurrentUser() {
        return SecurityUtils.getCurrentUserLogin().flatMap(this.userRepository::findOneWithAuthoritiesByLogin);
    }

    public Optional<User> getById(Long id) {
        return this.userRepository.findById(id);
    }

    public Optional<User> getByLogin(String login) {
        return this.userRepository.findOneWithAuthoritiesByLogin(login);
    }

    public Optional<User> getByEmail(String email) {
        return this.userRepository.findOneWithAuthoritiesByEmail(email);
    }

    public void changePassword(String password) {
        SecurityUtils.getCurrentUserLogin()
                .flatMap(this.userRepository::findByLogin)
                .ifPresent(user -> user.setPassword(this.passwordEncoder.encode(password)));
    }

    public Optional<User> requestPasswordReset(String mail) {
        return this.userRepository.findByEmail(mail)
                .filter(User::isActivated)
                .map(user -> {
                    user.setResetKey(RandomStringUtils.randomNumeric(RESET_KEY_SIZE));
                    return user;
                });
    }

    public Optional<User> completePasswordReset(String password, String key) {
        return userRepository.findByResetKey(key)
                .map(user -> {
                    user.setPassword(passwordEncoder.encode(password));
                    user.setResetKey(null);
                    return user;
                });
    }

    @Scheduled(cron = "0 0 9 * * ?")
    public void removeNotActivatedUsers() {
        this.userRepository
                .findAllByActivatedIsFalseAndRegisterDateBefore(ZonedDateTime.now().minus(3, ChronoUnit.DAYS))
                .forEach(this.userRepository::delete);
    }
}
