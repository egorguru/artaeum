package com.artaeum.uaa.controller;

import com.artaeum.uaa.config.Constants;
import com.artaeum.uaa.controller.error.EmailAlreadyUsedException;
import com.artaeum.uaa.controller.error.InternalServerException;
import com.artaeum.uaa.controller.error.InvalidPasswordException;
import com.artaeum.uaa.controller.error.LoginAlreadyUsedException;
import com.artaeum.uaa.domain.User;
import com.artaeum.uaa.dto.UserRegister;
import com.artaeum.uaa.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import java.security.Principal;

@RestController
public class AccountController {

    private UserService userService;

    public AccountController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/account/current")
    public Principal getCurrentUser(Principal principal) {
        return principal;
    }

    @PostMapping("/register")
    @ResponseStatus(HttpStatus.CREATED)
    public void createUser(@RequestBody @Valid UserRegister user) throws LoginAlreadyUsedException, EmailAlreadyUsedException {
        if (this.userService.getByLogin(user.getLogin()).isPresent()) {
            throw new LoginAlreadyUsedException();
        }
        if (this.userService.getByEmail(user.getEmail()).isPresent()) {
            throw new EmailAlreadyUsedException();
        }
        this.userService.create(user);
    }

    @GetMapping("/authenticate")
    public String isAuthenticated(HttpServletRequest request) {
        return request.getRemoteUser();
    }

    @GetMapping("/account")
    public User getCurrentAccount() throws InternalServerException {
        return userService.getCurrentUser()
                .orElseThrow(() -> new InternalServerException("User could not be found"));
    }

    @PostMapping(path = "/account/change-password")
    @ResponseStatus(HttpStatus.OK)
    public void changePassword(@RequestBody String password) throws InvalidPasswordException {
        if (!this.checkPasswordLength(password)) {
            throw new InvalidPasswordException();
        }
        userService.changePassword(password);
    }

    private boolean checkPasswordLength(String password) {
        return !password.isEmpty() &&
                password.length() >= Constants.PASSWORD_MIN_LENGTH &&
                password.length() <= Constants.PASSWORD_MAX_LENGTH;
    }
}
