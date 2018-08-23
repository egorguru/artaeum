package com.artaeum.uaa.controller.error;

public class InvalidPasswordException extends RuntimeException {

    public InvalidPasswordException() {
        super("Invalid password");
    }
}
