package com.artaeum.uaa.controller.error;

public class LoginAlreadyUsedException extends Exception {

    public LoginAlreadyUsedException() {
        super("Login already in use");
    }
}
