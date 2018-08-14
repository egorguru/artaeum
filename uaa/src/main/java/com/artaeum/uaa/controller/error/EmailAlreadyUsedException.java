package com.artaeum.uaa.controller.error;

public class EmailAlreadyUsedException extends Exception {

    public EmailAlreadyUsedException() {
        super("Email already in use");
    }
}
