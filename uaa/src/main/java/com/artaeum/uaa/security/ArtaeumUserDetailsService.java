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
import java.util.stream.Collectors;

@Component("userDetailsService")
public class ArtaeumUserDetailsService implements UserDetailsService {

    private UserRepository userRepository;

    public ArtaeumUserDetailsService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String loginOrEmail) throws UsernameNotFoundException {
        return this.userRepository.findOneWithAuthoritiesByEmail(loginOrEmail)
                .map(this::createSpringSecurityUser)
                .orElseGet(() -> this.userRepository.findOneWithAuthoritiesByLogin(loginOrEmail)
                        .map(this::createSpringSecurityUser)
                        .orElseThrow(() -> new UsernameNotFoundException(String.format("User '%s' not found", loginOrEmail))));
    }

    private org.springframework.security.core.userdetails.User createSpringSecurityUser(User user) {
        List<GrantedAuthority> grantedAuthorities = user.getAuthorities().stream()
                .map(authority -> new SimpleGrantedAuthority(authority.getName()))
                .collect(Collectors.toList());
        return new org.springframework.security.core.userdetails.User(
                user.getEmail(),
                user.getPassword(),
                grantedAuthorities
        );
    }
}
