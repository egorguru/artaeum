package com.artaeum.uaa.security;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

import java.security.Principal;
import java.util.Optional;

public final class SecurityUtils {

    private SecurityUtils() {}

    public static Optional<String> getCurrentUserLogin() {
        return Optional.ofNullable(SecurityContextHolder.getContext().getAuthentication()).map(Principal::getName);
    }

    public static boolean isAuthenticated() {
        return Optional.ofNullable(SecurityContextHolder.getContext().getAuthentication())
                .map(Authentication::isAuthenticated).orElse(false);
    }

    public static boolean isCurrentUserInRole(String authority) {
        return Optional.ofNullable(SecurityContextHolder.getContext().getAuthentication())
                .map(authentication -> authentication.getAuthorities().stream()
                        .anyMatch(grantedAuthority -> grantedAuthority.getAuthority().equals(authority)))
                .orElse(false);
    }
}
