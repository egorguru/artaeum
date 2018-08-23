package com.artaeum.uaa.controller.error;

public class LoginAlreadyUsedException extends RuntimeException {

    public LoginAlreadyUsedException() {
        super("Login already in use");
    }
}
