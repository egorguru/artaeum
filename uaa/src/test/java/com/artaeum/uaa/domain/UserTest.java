package com.artaeum.uaa.domain;

import org.junit.Test;

import static org.junit.Assert.assertEquals;

public class UserTest {

    @Test
    public void whenSetLoginWithUpperCaseThenItWillBeLower() {
        User user = new User();
        user.setLogin("TeSt_LogIn");
        assertEquals(user.getLogin(), "test_login");
    }
}
