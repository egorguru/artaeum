package com.artaeum.uaa.service;

import com.artaeum.uaa.config.Constants;
import com.artaeum.uaa.domain.User;
import com.artaeum.uaa.repository.AuthorityRepository;
import com.artaeum.uaa.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

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

    public void create(User user) {
        user.setPassword(this.passwordEncoder.encode(user.getPassword()));
        this.authorityRepository.findById(Constants.USER_AUTHORITY)
                .ifPresent(authority -> user.getAuthorities().add(authority));
        this.userRepository.save(user);
    }
}
