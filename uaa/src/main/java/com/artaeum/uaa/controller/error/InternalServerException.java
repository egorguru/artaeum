package com.artaeum.uaa.controller.error;

public class InternalServerException extends RuntimeException {

    public InternalServerException() {
        super();
    }

    public InternalServerException(String msg) {
        super(msg);
    }
}
