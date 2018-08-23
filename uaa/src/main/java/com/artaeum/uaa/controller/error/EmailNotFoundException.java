package com.artaeum.uaa.controller.error;

public class EmailNotFoundException extends RuntimeException {

    public EmailNotFoundException() {
        super("Email not found");
    }
}
