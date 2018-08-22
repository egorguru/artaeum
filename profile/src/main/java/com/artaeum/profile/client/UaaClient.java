package com.artaeum.profile.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(name = "uaa")
public interface UaaClient {

    @GetMapping("/uaa/user/id/{login}")
    Long getUserIdByLogin(@PathVariable String login);

    @GetMapping("/uaa/user/login/{id}")
    String getUserLoginById(@PathVariable Long id);
}
