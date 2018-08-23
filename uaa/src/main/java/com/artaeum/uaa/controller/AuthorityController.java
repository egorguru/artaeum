package com.artaeum.uaa.controller;

import com.artaeum.uaa.domain.Authority;
import com.artaeum.uaa.repository.AuthorityRepository;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

@RestController
public class AuthorityController {

    private AuthorityRepository authorityRepository;

    public AuthorityController(AuthorityRepository authorityRepository) {
        this.authorityRepository = authorityRepository;
    }

    @GetMapping("/authorities")
    public List<String> getAuthorities() {
        return this.authorityRepository.findAll().stream()
                .map(Authority::getName)
                .collect(Collectors.toList());
    }
}
