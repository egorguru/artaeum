package com.artaeum.uaa.controller.error;

public class InvalidPasswordException extends Exception {

    public InvalidPasswordException() {
        super("Invalid password");
    }
}
