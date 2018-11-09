package com.artaeum.uaa.controller;

import com.artaeum.uaa.config.Constants;
import com.artaeum.uaa.controller.error.EmailAlreadyUsedException;
import com.artaeum.uaa.controller.error.LoginAlreadyUsedException;
import com.artaeum.uaa.controller.error.UserNotFoundException;
import com.artaeum.uaa.controller.utils.PaginationUtil;
import com.artaeum.uaa.domain.User;
import com.artaeum.uaa.dto.UserDTO;
import com.artaeum.uaa.service.UserService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/users");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    @GetMapping("/search")
    public ResponseEntity<List<UserDTO>> search(Pageable pageable, @RequestParam String query) {
        Page<UserDTO> page = this.userService.search(pageable, query);
        HttpHeaders headers = PaginationUtil
                .generatePaginationHttpHeaders(page, "/users/search?query=" + query);
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    @GetMapping("/{loginOrId}")
    public ResponseEntity<UserDTO> getUserByLoginOrId(@PathVariable String loginOrId) {
        User user = this.userService.getById(loginOrId)
                .orElseGet(() -> this.userService.getByLogin(loginOrId)
                        .orElseThrow(UserNotFoundException::new));
        return new ResponseEntity<>(new UserDTO(user), HttpStatus.OK);
    }

    @GetMapping("/{id}/login")
    public String getUserLoginById(@PathVariable String id) {
        return this.userService.getById(id)
                .map(User::getLogin)
                .orElseThrow(UserNotFoundException::new);
    }

    @GetMapping("/{login}/id")
    public String getUserIdByLogin(@PathVariable String login) {
        return this.userService.getByLogin(login)
                .map(User::getId)
                .orElseThrow(UserNotFoundException::new);
    }

    @PutMapping
    @ResponseStatus(HttpStatus.OK)
    public void updateUser(@Valid @RequestBody UserDTO userDTO) {
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
    @ResponseStatus(HttpStatus.OK)
    public void deleteUser(@PathVariable String login) {
        this.userService.delete(login);
    }
}
