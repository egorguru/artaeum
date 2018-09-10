package com.artaeum.gateway.controller;

import com.artaeum.gateway.service.OAuth2AuthenticationService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.oauth2.common.OAuth2AccessToken;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
public class AuthController {

    private OAuth2AuthenticationService authenticationService;

    public AuthController(OAuth2AuthenticationService authenticationService) {
        this.authenticationService = authenticationService;
    }

    @PostMapping("login")
    public ResponseEntity<OAuth2AccessToken> authenticate(@RequestBody Map<String, String> params) {
        return authenticationService.authenticate(params.get("username"), params.get("password"));
    }
}
