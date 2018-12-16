package com.artaeum.media.config

import org.springframework.context.annotation.Configuration
import org.springframework.http.HttpMethod
import org.springframework.security.config.annotation.web.builders.HttpSecurity
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter

@Configuration
class SecurityConfig extends WebSecurityConfigurerAdapter {

  override protected def configure(http: HttpSecurity): Unit = {
    http
      .csrf
        .disable
        .httpBasic
      .and
        .authorizeRequests
        .antMatchers("/actuator/**").permitAll()
        .antMatchers(HttpMethod.GET).permitAll
        .anyRequest.authenticated
  }
}
