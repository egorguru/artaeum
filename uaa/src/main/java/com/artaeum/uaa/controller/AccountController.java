package com.artaeum.uaa.controller;

import com.artaeum.uaa.config.Constants;
import com.artaeum.uaa.controller.error.*;
import com.artaeum.uaa.domain.User;
import com.artaeum.uaa.dto.UserDTO;
import com.artaeum.uaa.dto.UserRegister;
import com.artaeum.uaa.dto.UserReset;
import com.artaeum.uaa.security.SecurityUtils;
import com.artaeum.uaa.service.MailService;
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

    private MailService mailService;

    public AccountController(UserService userService, MailService mailService) {
        this.userService = userService;
        this.mailService = mailService;
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
        // must be validation for langKey
        User newUser = this.userService.register(user);
        this.mailService.sendActivationEmail(newUser);
    }

    @GetMapping("/activate")
    public void activateAccount(@RequestParam(value = "key") String key) throws InternalServerException {
        Optional<User> user = userService.activateRegistration(key);
        if (!user.isPresent()) {
            throw new InternalServerException("User not found for this reset key");
        }
    }

    @GetMapping("/authenticate")
    public String isAuthenticated(HttpServletRequest request) {
        return request.getRemoteUser();
    }

    @GetMapping("/account")
    public UserDTO getCurrentAccount() throws InternalServerException {
        return userService.getCurrentUser()
                .map(UserDTO::new)
                .orElseThrow(() -> new InternalServerException("User not found"));
    }

    @PostMapping("/account")
    public void saveAccount(@Valid @RequestBody UserDTO userDTO) throws InternalServerException, EmailAlreadyUsedException {
        String userLogin = SecurityUtils.getCurrentUserLogin()
                .orElseThrow(() -> new InternalServerException("User not found"));
        Optional<User> existingUserByLogin = this.userService.getByLogin(userLogin);
        if (!existingUserByLogin.isPresent()) {
            throw new InternalServerException("User not found");
        }
        Optional<User> existingUserByEmail = this.userService.getByEmail(userDTO.getEmail().toLowerCase());
        if (existingUserByEmail.isPresent() && (!existingUserByEmail.get().getLogin().equalsIgnoreCase(userLogin))) {
            throw new EmailAlreadyUsedException();
        }
        this.userService.update(userDTO.getFirstName(), userDTO.getLastName(), userDTO.getEmail(), userDTO.getLangKey());
    }

    @PostMapping(path = "/account/reset-password/init")
    public void requestPasswordReset(@RequestBody String mail) throws EmailNotFoundException {
        mailService.sendPasswordResetMail(
                userService.requestPasswordReset(mail)
                        .orElseThrow(EmailNotFoundException::new));
    }

    @PostMapping(path = "/account/reset-password/finish")
    public void finishPasswordReset(@RequestBody UserReset user) throws InvalidPasswordException, InternalServerException {
        if (!checkPasswordLength(user.getPassword())) {
            throw new InvalidPasswordException();
        }
        Optional<User> updatedUser = userService.completePasswordReset(user.getPassword(), user.getResetKey());
        if (!updatedUser.isPresent()) {
            throw new InternalServerException("User not found for this reset key");
        }
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
