package com.artaeum.profile.dto;

import javax.validation.constraints.NotEmpty;
import java.time.ZonedDateTime;

public class PostDTO {

    private Long id;

    @NotEmpty
    private String text;

    private String userLogin;

    private ZonedDateTime createdDate;

    public PostDTO() {}

    public PostDTO(Long id, String text, String userLogin, ZonedDateTime createdDate) {
        this.id = id;
        this.text = text;
        this.userLogin = userLogin;
        this.createdDate = createdDate;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public String getUserLogin() {
        return userLogin;
    }

    public void setUserLogin(String userLogin) {
        this.userLogin = userLogin;
    }

    public ZonedDateTime getCreatedDate() {
        return createdDate;
    }

    public void setCreatedDate(ZonedDateTime createdDate) {
        this.createdDate = createdDate;
    }
}
