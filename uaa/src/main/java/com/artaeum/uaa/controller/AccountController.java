package com.artaeum.uaa.controller;

import com.artaeum.uaa.config.Constants;
import com.artaeum.uaa.controller.error.*;
import com.artaeum.uaa.domain.User;
import com.artaeum.uaa.dto.UserDTO;
import com.artaeum.uaa.dto.UserRegister;
import com.artaeum.uaa.dto.UserReset;
import com.artaeum.uaa.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import java.security.Principal;
import java.util.Optional;

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
    public void createUser(@RequestBody @Valid UserRegister user) {
        if (this.userService.getByLogin(user.getLogin()).isPresent()) {
            throw new LoginAlreadyUsedException();
        }
        if (this.userService.getByEmail(user.getEmail()).isPresent()) {
            throw new EmailAlreadyUsedException();
        }
        // must be validation for langKey
        this.userService.register(user);
    }

    @GetMapping("/activate")
    public void activateAccount(@RequestParam(value = "key") String key) {
        Optional<User> user = this.userService.activateRegistration(key);
        if (!user.isPresent()) {
            throw new UserNotFoundException("User not found for this reset key");
        }
    }

    @GetMapping("/authenticate")
    public String isAuthenticated(HttpServletRequest request) {
        return request.getRemoteUser();
    }

    @GetMapping("/account")
    public UserDTO getCurrentAccount(Principal principal) {
        return this.userService.getByLogin(principal.getName())
                .map(UserDTO::new)
                .orElseThrow(UserNotFoundException::new);
    }

    @PostMapping("/account")
    public void saveAccount(@Valid @RequestBody UserDTO userDTO, Principal principal) {
        Optional<User> existingUserByLogin = this.userService.getByLogin(principal.getName());
        if (!existingUserByLogin.isPresent()) {
            throw new UserNotFoundException("User not found");
        }
        Optional<User> existingUserByEmail = this.userService.getByEmail(userDTO.getEmail().toLowerCase());
        if (existingUserByEmail.isPresent() && (!existingUserByEmail.get().getLogin().equalsIgnoreCase(principal.getName()))) {
            throw new EmailAlreadyUsedException();
        }
        this.userService.update(principal.getName(), userDTO.getFirstName(), userDTO.getLastName(), userDTO.getEmail(), userDTO.getLangKey());
    }

    @PostMapping("/account/change-password")
    @ResponseStatus(HttpStatus.OK)
    public void changePassword(@RequestBody String password, Principal principal) {
        if (!this.checkPasswordLength(password)) {
            throw new InvalidPasswordException();
        }
        userService.changePassword(principal.getName(), password);
    }

    private boolean checkPasswordLength(String password) {
        return !password.isEmpty() &&
                password.length() >= Constants.PASSWORD_MIN_LENGTH &&
                password.length() <= Constants.PASSWORD_MAX_LENGTH;
    }
}
