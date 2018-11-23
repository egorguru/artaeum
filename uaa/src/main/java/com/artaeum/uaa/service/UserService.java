package com.artaeum.uaa.service;

import com.artaeum.uaa.config.Constants;
import com.artaeum.uaa.domain.Authority;
import com.artaeum.uaa.domain.User;
import com.artaeum.uaa.dto.UserDTO;
import com.artaeum.uaa.dto.UserRegister;
import com.artaeum.uaa.repository.AuthorityRepository;
import com.artaeum.uaa.repository.UserRepository;
import org.apache.commons.lang.RandomStringUtils;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.ZonedDateTime;
import java.time.temporal.ChronoUnit;
import java.util.Optional;
import java.util.Set;

@Service
public class UserService {

    private static final int KEY_SIZE = 20;

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
        newUser.setFirstName(user.getFirstName());
        newUser.setLastName(user.getLastName());
        newUser.setPassword(this.passwordEncoder.encode(user.getPassword()));
        newUser.setLangKey(user.getLangKey());
        newUser.setRegisterDate(ZonedDateTime.now());
        newUser.setActivationKey(RandomStringUtils.randomNumeric(KEY_SIZE));
        this.authorityRepository.findById(Constants.USER_AUTHORITY)
                .ifPresent(authority -> newUser.getAuthorities().add(authority));
        return this.userRepository.save(newUser);
    }

    public void update(UserDTO userDTO) {
        this.userRepository.findById(userDTO.getId())
                .ifPresent(user -> {
                    user.setLogin(userDTO.getLogin());
                    user.setFirstName(userDTO.getFirstName());
                    user.setLastName(userDTO.getLastName());
                    user.setEmail(userDTO.getEmail());
                    user.setActivated(userDTO.isActivated());
                    user.setLangKey(userDTO.getLangKey());
                    Set<Authority> managedAuthorities = user.getAuthorities();
                    managedAuthorities.clear();
                    userDTO.getAuthorities().stream()
                            .map(this.authorityRepository::findByName)
                            .forEach(managedAuthorities::add);
                });
    }

    public void update(String id, String login, String firstName, String lastName, String email, String langKey) {
        this.userRepository.findById(id)
                .ifPresent(user -> {
                    user.setLogin(login);
                    user.setFirstName(firstName);
                    user.setLastName(lastName);
                    user.setEmail(email);
                    user.setLangKey(langKey);
                });
    }

    public void delete(String login) {
        this.userRepository.deleteByLogin(login);
    }

    public Optional<User> activateRegistration(String key) {
        return this.userRepository.findByActivationKey(key)
                .map(user -> {
                    user.setActivated(true);
                    user.setActivationKey(null);
                    return user;
                });
    }

    @Transactional(readOnly = true)
    public Page<UserDTO> search(Pageable pageable, String query) {
        return this.userRepository
                .findAllByLoginLikeOrFirstNameLikeOrLastNameLike(
                        pageable,
                        query,
                        query,
                        query
                ).map(UserDTO::new);
    }

    public Page<UserDTO> getAll(Pageable pageable) {
        return this.userRepository.findAll(pageable).map(UserDTO::new);
    }

    public Optional<User> getById(String id) {
        return this.userRepository.findById(id);
    }

    public Optional<User> getByLogin(String login) {
        return this.userRepository.findOneWithAuthoritiesByLogin(login);
    }

    public Optional<User> getByEmail(String email) {
        return this.userRepository.findOneWithAuthoritiesByEmail(email);
    }

    public void changePassword(String id, String password) {
        this.userRepository.findById(id)
                .ifPresent(user -> user.setPassword(this.passwordEncoder.encode(password)));
    }

    public Optional<User> requestPasswordReset(String mail) {
        return this.userRepository.findByEmail(mail)
                .filter(User::isActivated)
                .map(user -> {
                    user.setResetKey(RandomStringUtils.randomNumeric(KEY_SIZE));
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