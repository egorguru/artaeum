package com.artaeum.uaa.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.env.Environment;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.config.annotation.configurers.ClientDetailsServiceConfigurer;
import org.springframework.security.oauth2.config.annotation.web.configuration.AuthorizationServerConfigurerAdapter;
import org.springframework.security.oauth2.config.annotation.web.configuration.EnableAuthorizationServer;
import org.springframework.security.oauth2.config.annotation.web.configurers.AuthorizationServerEndpointsConfigurer;
import org.springframework.security.oauth2.config.annotation.web.configurers.AuthorizationServerSecurityConfigurer;
import org.springframework.security.oauth2.provider.token.TokenStore;
import org.springframework.security.oauth2.provider.token.store.InMemoryTokenStore;

@Configuration
@EnableAuthorizationServer
public class OAuth2Config extends AuthorizationServerConfigurerAdapter {

    private PasswordEncoder passwordEncoder;

    private Environment env;

    private AuthenticationManager authenticationManager;

    private UserDetailsService userDetailsService;

    public OAuth2Config(PasswordEncoder passwordEncoder,
                        Environment env,
                        AuthenticationManager authenticationManager,
                        UserDetailsService userDetailsService) {
        this.passwordEncoder = passwordEncoder;
        this.env = env;
        this.authenticationManager = authenticationManager;
        this.userDetailsService = userDetailsService;
    }

    @Override
    public void configure(AuthorizationServerSecurityConfigurer security) {
        security
                .tokenKeyAccess("permitAll()")
                .checkTokenAccess("isAuthenticated()")
                .passwordEncoder(passwordEncoder);
    }

    @Override
    public void configure(ClientDetailsServiceConfigurer clients) throws Exception {
        clients
                .inMemory()
                    .withClient("gateway")
                    .secret(this.passwordEncoder.encode(this.env.getProperty("GATEWAY_SERVICE_PASSWORD")))
                    .authorizedGrantTypes("password", "refresh_token")
                    .scopes("client.user")
                .and()
                    .withClient("uaa")
                    .secret(this.passwordEncoder.encode(this.env.getProperty("UAA_SERVICE_PASSWORD")))
                    .authorizedGrantTypes("client_credentials", "refresh_token")
                    .scopes("server")
                .and()
                    .withClient("profile")
                    .secret(this.passwordEncoder.encode(this.env.getProperty("PROFILE_SERVICE_PASSWORD")))
                    .authorizedGrantTypes("client_credentials", "refresh_token")
                    .scopes("server")
                .and()
                    .withClient("media")
                    .secret(this.passwordEncoder.encode(this.env.getProperty("MEDIA_SERVICE_PASSWORD")))
                    .authorizedGrantTypes("client_credentials", "refresh_token")
                    .scopes("server")
                .and()
                    .withClient("chat")
                    .secret(this.passwordEncoder.encode(this.env.getProperty("CHAT_SERVICE_PASSWORD")))
                    .authorizedGrantTypes("client_credentials", "refresh_token")
                    .scopes("server")
                .and()
                    .withClient("comment")
                    .secret(this.passwordEncoder.encode(this.env.getProperty("COMMENT_SERVICE_PASSWORD")))
                    .authorizedGrantTypes("client_credentials", "refresh_token")
                    .scopes("server")
                .and()
                    .withClient("storage")
                    .secret(this.passwordEncoder.encode(this.env.getProperty("STORAGE_SERVICE_PASSWORD")))
                    .authorizedGrantTypes("client_credentials", "refresh_token")
                    .scopes("server")
                .and()
                    .withClient("blog")
                    .secret(this.passwordEncoder.encode(this.env.getProperty("BLOG_SERVICE_PASSWORD")))
                    .authorizedGrantTypes("client_credentials", "refresh_token")
                    .scopes("server");
    }

    @Override
    public void configure(AuthorizationServerEndpointsConfigurer endpoints) {
        endpoints
                .tokenStore(tokenStore())
                .authenticationManager(authenticationManager)
                .userDetailsService(userDetailsService);
    }

    @Bean
    public TokenStore tokenStore() {
        return new InMemoryTokenStore();
    }
}
