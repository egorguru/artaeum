package com.artaeum.uaa.controller;

import com.artaeum.uaa.dto.UserRegister;
import com.artaeum.uaa.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
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
    @ResponseStatus(HttpStatus.CREATED)
    public void createUser(@RequestBody @Valid UserRegister user) throws Exception {
        if (this.userService.getByLogin(user.getLogin()).isPresent()) {
            throw new Exception();
        }
        if (this.userService.getByEmail(user.getEmail()).isPresent()) {
            throw new Exception();
        }
        this.userService.create(user);
    }
}
