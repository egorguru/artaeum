package com.artaeum.uaa.controller.error;

public class EmailAlreadyUsedException extends RuntimeException {

    public EmailAlreadyUsedException() {
        super("Email already in use");
    }
}
