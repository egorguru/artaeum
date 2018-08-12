package com.artaeum.uaa.controller;

import com.artaeum.uaa.domain.User;
import com.artaeum.uaa.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

@RestController
public class UserController {

    private UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/users/current")
    public Principal getCurrentUser(Principal principal) {
        return principal;
    }

    @PostMapping("/register")
    @ResponseStatus(HttpStatus.OK)
    public void createUser(@RequestBody User user) {
        this.userService.create(user);
    }
}
