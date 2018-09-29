package com.artaeum.uaa.security;

import com.artaeum.uaa.domain.User;
import com.artaeum.uaa.repository.UserRepository;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Locale;
import java.util.stream.Collectors;

@Component("userDetailsService")
public class ArtaeumUserDetailsService implements UserDetailsService {

    private UserRepository userRepository;

    public ArtaeumUserDetailsService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        String lowercaseUsername = username.toLowerCase(Locale.ENGLISH);
        return this.userRepository.findOneWithAuthoritiesByEmail(lowercaseUsername)
                .map(this::createSpringSecurityUser)
                .orElseGet(() -> this.userRepository.findOneWithAuthoritiesByLogin(lowercaseUsername)
                        .map(this::createSpringSecurityUser)
                        .orElseThrow(() -> new UsernameNotFoundException(String.format("User '%s' not found", lowercaseUsername))));
    }

    private org.springframework.security.core.userdetails.User createSpringSecurityUser(User user) {
        List<GrantedAuthority> grantedAuthorities = user.getAuthorities().stream()
                .map(authority -> new SimpleGrantedAuthority(authority.getName()))
                .collect(Collectors.toList());
        return new org.springframework.security.core.userdetails.User(
                user.getId().toString(),
                user.getPassword(),
                grantedAuthorities
        );
    }
}