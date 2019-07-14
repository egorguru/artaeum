package com.artaeum.gateway.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.security.oauth2.common.OAuth2AccessToken;
import org.springframework.stereotype.Service;
import org.springframework.util.Base64Utils;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;

@Service
public class OAuth2AuthenticationService {

    @Value("${oauth2.client.accessTokenUri}")
    private String accessTokenUri;

    @Value("${oauth2.client.clientId}")
    private String clientId;

    @Value("${oauth2.client.clientSecret}")
    private String clientSecret;

    private RestTemplate restTemplate;

    public OAuth2AuthenticationService(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    public ResponseEntity<OAuth2AccessToken> authenticate(String username, String password) {
        HttpHeaders headers = new HttpHeaders() {{
            setContentType(MediaType.APPLICATION_FORM_URLENCODED);
            add("Authorization", getAuthorizationHeader());
        }};
        MultiValueMap<String, String> params = new LinkedMultiValueMap<String, String>() {{
            set("username", username);
            set("password", password);
            set("grant_type", "password");
        }};
        ResponseEntity<OAuth2AccessToken> response = this.restTemplate.postForEntity(
                this.accessTokenUri,
                new HttpEntity<>(params, headers),
                OAuth2AccessToken.class
        );
        if (response.getStatusCode() != HttpStatus.OK) {
            throw new HttpClientErrorException(response.getStatusCode());
        }
        return response;
    }

    private String getAuthorizationHeader() {
        String authorization = String.format("%s:%s", this.clientId, this.clientSecret);
        return "Basic " + Base64Utils.encodeToString(authorization.getBytes());
    }
}
