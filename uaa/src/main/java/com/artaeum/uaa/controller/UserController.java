package com.artaeum.uaa.controller;

import com.artaeum.uaa.config.Constants;
import com.artaeum.uaa.controller.error.EmailAlreadyUsedException;
import com.artaeum.uaa.controller.error.InternalServerException;
import com.artaeum.uaa.controller.error.LoginAlreadyUsedException;
import com.artaeum.uaa.controller.utils.PaginationUtil;
import com.artaeum.uaa.domain.User;
import com.artaeum.uaa.dto.UserDTO;
import com.artaeum.uaa.service.UserService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/users")
public class UserController {

    private UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping
    public ResponseEntity<List<UserDTO>> getAllUsers(Pageable pageable) {
        Page<UserDTO> page = this.userService.getAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/users");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    @GetMapping("/{login:" + Constants.LOGIN_REGEX + "}")
    public ResponseEntity<UserDTO> getUser(@PathVariable String login) throws InternalServerException {
        UserDTO userDTO = this.userService.getByLogin(login)
                .map(UserDTO::new)
                .orElseThrow(() -> new InternalServerException("User not found"));
        return new ResponseEntity<>(userDTO, HttpStatus.OK);
    }

    @PutMapping
    @Secured(Constants.ADMIN_AUTHORITY)
    public void updateUser(@Valid @RequestBody UserDTO userDTO) throws EmailAlreadyUsedException, LoginAlreadyUsedException {
        Optional<User> existingUserByEmail = this.userService.getByEmail(userDTO.getEmail().toLowerCase());
        if (existingUserByEmail.isPresent() && (!existingUserByEmail.get().getId().equals(userDTO.getId()))) {
            throw new EmailAlreadyUsedException();
        }
        Optional<User> existingUserByLogin = this.userService.getByLogin(userDTO.getLogin().toLowerCase());
        if (existingUserByLogin.isPresent() && (!existingUserByLogin.get().getId().equals(userDTO.getId()))) {
            throw new LoginAlreadyUsedException();
        }
        this.userService.update(userDTO);
    }

    @DeleteMapping("/{login:" + Constants.LOGIN_REGEX + "}")
    @Secured(Constants.ADMIN_AUTHORITY)
    @ResponseStatus(HttpStatus.OK)
    public void deleteUser(@PathVariable String login) {
        this.userService.delete(login);
    }
}
