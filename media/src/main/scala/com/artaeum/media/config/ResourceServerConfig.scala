package com.artaeum.media.config

import org.springframework.context.annotation.{Bean, Configuration}
import org.springframework.http.HttpMethod
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity
import org.springframework.security.config.annotation.web.builders.HttpSecurity
import org.springframework.security.config.http.SessionCreationPolicy
import org.springframework.security.oauth2.config.annotation.web.configuration.{EnableResourceServer, ResourceServerConfigurerAdapter}
import org.springframework.web.client.RestTemplate

@Configuration
@EnableResourceServer
@EnableGlobalMethodSecurity(prePostEnabled = true, securedEnabled = true)
class ResourceServerConfig extends ResourceServerConfigurerAdapter {

  override def configure(http: HttpSecurity): Unit = {
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
        .authorizeRequests()
        .antMatchers(HttpMethod.GET).permitAll()
        .antMatchers("/**").authenticated()
  }

  @Bean def restTemplate = new RestTemplate
}
