package com.artaeum.uaa.controller;

import com.artaeum.uaa.config.Constants;
import com.artaeum.uaa.controller.error.*;
import com.artaeum.uaa.domain.User;
import com.artaeum.uaa.dto.UserDTO;
import com.artaeum.uaa.dto.UserRegister;
import com.artaeum.uaa.dto.UserReset;
import com.artaeum.uaa.service.MailService;
import com.artaeum.uaa.service.UserService;
import org.springframework.core.env.Environment;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import java.security.Principal;
import java.util.List;
import java.util.Optional;

@RestController
public class AccountController {

    private UserService userService;

    private MailService mailService;

    private Environment env;

    public AccountController(UserService userService, MailService mailService, Environment env) {
        this.userService = userService;
        this.mailService = mailService;
        this.env = env;
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
        if (!this.checkCorrectLangKey(user.getLangKey())) {
            user.setLangKey(Constants.DEFAULT_LANG_KEY);
        }
        User newUser = this.userService.register(user);
        this.mailService.sendActivationEmail(newUser);
    }

    @GetMapping("/activate")
    public void activateAccount(@RequestParam(value = "key") String key) {
        if (!this.userService.activateRegistration(key).isPresent()) {
            throw new InternalServerException("User not found for this reset key");
        }
    }

    @GetMapping("/authenticate")
    public String isAuthenticated(HttpServletRequest request) {
        return request.getRemoteUser();
    }

    @GetMapping("/account")
    public UserDTO getCurrentAccount(Principal principal) {
        return this.userService.getById(principal.getName())
                .map(UserDTO::new)
                .orElseThrow(UserNotFoundException::new);
    }

    @PostMapping("/account")
    public void saveAccount(@Valid @RequestBody UserDTO userDTO, Principal principal) {
        String currentUserId = principal.getName();
        Optional<User> existingUserByLogin = this.userService.getByLogin(userDTO.getLogin());
        if (existingUserByLogin.isPresent() && !existingUserByLogin.get().getId().equals(currentUserId)) {
            throw new LoginAlreadyUsedException();
        }
        String emailLowerCase = userDTO.getEmail().toLowerCase();
        Optional<User> existingUserByEmail = this.userService.getByEmail(emailLowerCase);
        if (existingUserByEmail.isPresent() && !existingUserByEmail.get().getId().equals(currentUserId)) {
            throw new EmailAlreadyUsedException();
        }
        this.userService.update(currentUserId, userDTO.getLogin(),
                                userDTO.getFirstName(), userDTO.getLastName(),
                                userDTO.getEmail(), userDTO.getLangKey());
    }

    @PostMapping(path = "/account/reset-password/init")
    public void requestPasswordReset(@RequestBody String mail) {
        mailService.sendPasswordResetMail(
                this.userService.requestPasswordReset(mail)
                        .orElseThrow(EmailNotFoundException::new));
    }

    @PostMapping(path = "/account/reset-password/finish")
    public void finishPasswordReset(@RequestBody UserReset user) {
        if (!checkPasswordLength(user.getPassword())) {
            throw new InvalidPasswordException();
        }
        Optional<User> updatedUser = this.userService.completePasswordReset(user.getPassword(), user.getResetKey());
        if (!updatedUser.isPresent()) {
            throw new UserNotFoundException("User not found for this reset key");
        }
    }

    @PostMapping("/account/change-password")
    @ResponseStatus(HttpStatus.OK)
    public void changePassword(@RequestBody String password, Principal principal) {
        if (!this.checkPasswordLength(password)) {
            throw new InvalidPasswordException();
        }
        this.userService.changePassword(principal.getName(), password);
    }

    private boolean checkCorrectLangKey(String langKey) {
        return this.env.getProperty("artaeum.languages", List.class).contains(langKey);
    }

    private boolean checkPasswordLength(String password) {
        return !password.isEmpty() &&
                password.length() >= Constants.PASSWORD_MIN_LENGTH &&
                password.length() <= Constants.PASSWORD_MAX_LENGTH;
    }
}
