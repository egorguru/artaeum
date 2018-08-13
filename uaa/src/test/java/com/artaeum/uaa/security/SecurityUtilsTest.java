package com.artaeum.uaa.security;

import com.artaeum.uaa.config.Constants;
import org.junit.Test;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertTrue;

public class SecurityUtilsTest {

    @Test
    public void whenGetLogin() {
        SecurityContext securityContext = SecurityContextHolder.createEmptyContext();
        securityContext.setAuthentication(new UsernamePasswordAuthenticationToken("admin", "admin"));
        SecurityContextHolder.setContext(securityContext);
        Optional<String> result = SecurityUtils.getCurrentUserLogin();
        assertEquals(result.get(), "admin");
    }

    @Test
    public void whenCheckAuthenticatedUser() {
        SecurityContext securityContext = SecurityContextHolder.createEmptyContext();
        Authentication authentication =
                new UsernamePasswordAuthenticationToken("admin", "admin", Collections.emptyList());
        securityContext.setAuthentication(authentication);
        SecurityContextHolder.setContext(securityContext);
        boolean result = SecurityUtils.isAuthenticated();
        assertTrue(result);
    }

    @Test
    public void whenCheckNotAuthenticatedUser() {
        SecurityContext securityContext = SecurityContextHolder.createEmptyContext();
        SecurityContextHolder.setContext(securityContext);
        boolean result = SecurityUtils.isAuthenticated();
        assertFalse(result);
    }

    @Test
    public void whenUserInRoleUserAndNotInRoleAdmin() {
        SecurityContext securityContext = SecurityContextHolder.createEmptyContext();
        List<GrantedAuthority> authorities = new ArrayList<>();
        authorities.add(new SimpleGrantedAuthority(Constants.USER_AUTHORITY));
        securityContext.setAuthentication(new UsernamePasswordAuthenticationToken("user", "user", authorities));
        SecurityContextHolder.setContext(securityContext);
        assertTrue(SecurityUtils.isCurrentUserInRole(Constants.USER_AUTHORITY));
        assertFalse(SecurityUtils.isCurrentUserInRole(Constants.ADMIN_AUTHORITY));
    }
}
