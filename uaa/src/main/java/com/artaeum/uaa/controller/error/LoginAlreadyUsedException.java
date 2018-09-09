package com.artaeum.uaa.controller.error;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.BAD_REQUEST)
public class LoginAlreadyUsedException extends RuntimeException {

    public LoginAlreadyUsedException() {
        super("Login already in use");
    }
}
