package com.artaeum.uaa.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.oauth2.config.annotation.web.configuration.EnableResourceServer;
import org.springframework.security.oauth2.config.annotation.web.configuration.ResourceServerConfigurerAdapter;
import org.springframework.security.web.AuthenticationEntryPoint;

@Configuration
@EnableResourceServer
public class ResourceServerConfiguration extends ResourceServerConfigurerAdapter {

    @Override
    public void configure(HttpSecurity http) throws Exception {
        http
                .csrf()
                    .disable()
                .headers()
                    .frameOptions()
                    .disable()
                .and()
                    .sessionManagement()
                    .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                    .exceptionHandling()
                    .authenticationEntryPoint(authenticationEntryPoint())
                .and()
                    .authorizeRequests()
                    .antMatchers("/actuator/**").permitAll()
                    .antMatchers("/register").permitAll()
                    .antMatchers("/activate").permitAll()
                    .antMatchers("/authenticate").permitAll()
                    .antMatchers("/account/reset-password/**").permitAll()
                    .antMatchers(HttpMethod.GET, "/users/**").permitAll()
                    .antMatchers(HttpMethod.PUT, "/users").hasAuthority(Constants.ADMIN_AUTHORITY)
                    .antMatchers(HttpMethod.DELETE, "/users/**").hasAuthority(Constants.ADMIN_AUTHORITY)
                    .antMatchers(HttpMethod.GET, "/authorities").hasAuthority(Constants.ADMIN_AUTHORITY)
                    .antMatchers("/**").authenticated();
    }

    @Bean
    public AuthenticationEntryPoint authenticationEntryPoint() {
        return (request, response, authException) -> {
            response.addHeader("Content-Type", "application/json");
            response.getWriter().append("{\"message\":\"UNAUTHORIZED\"}");
            response.setStatus(HttpStatus.UNAUTHORIZED.value());
        };
    }
}
