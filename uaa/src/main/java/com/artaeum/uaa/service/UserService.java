package com.artaeum.uaa.service;

import com.artaeum.uaa.config.Constants;
import com.artaeum.uaa.domain.User;
import com.artaeum.uaa.dto.UserRegister;
import com.artaeum.uaa.repository.AuthorityRepository;
import com.artaeum.uaa.repository.UserRepository;
import com.artaeum.uaa.security.SecurityUtils;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {

    private UserRepository userRepository;

    private AuthorityRepository authorityRepository;

    private PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository, AuthorityRepository authorityRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.authorityRepository = authorityRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public void create(UserRegister user) {
        User newUser = new User();
        newUser.setLogin(user.getLogin());
        newUser.setEmail(user.getEmail());
        newUser.setPassword(this.passwordEncoder.encode(user.getPassword()));
        this.authorityRepository.findById(Constants.USER_AUTHORITY)
                .ifPresent(authority -> newUser.getAuthorities().add(authority));
        this.userRepository.save(newUser);
    }

    public Optional<User> getCurrentUser() {
        return SecurityUtils.getCurrentUserLogin().flatMap(userRepository::findOneWithAuthoritiesByLogin);
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
                .flatMap(userRepository::findByLogin)
                .ifPresent(user -> user.setPassword(passwordEncoder.encode(password)));
    }
}
