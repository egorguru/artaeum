package com.artaeum.uaa.dto;

import com.artaeum.uaa.config.Constants;
import com.artaeum.uaa.domain.Authority;
import com.artaeum.uaa.domain.User;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;
import java.time.ZonedDateTime;
import java.util.Set;
import java.util.stream.Collectors;

public class UserDTO {

    private String id;

    @NotBlank
    @Pattern(regexp = Constants.LOGIN_REGEX)
    @Size(min = 3, max = 50)
    private String login;

    @Email
    @NotBlank
    @Size(min = 5, max = 100)
    private String email;

    @Size(max = 50)
    private String firstName;

    @Size(max = 50)
    private String lastName;

    private boolean activated = false;

    @Size(min = 2, max = 6)
    private String langKey;

    private ZonedDateTime registerDate;

    private Set<String> authorities;

    public UserDTO() {
    }

    public UserDTO(User user) {
        this.id = user.getId();
        this.login = user.getLogin();
        this.firstName = user.getFirstName();
        this.lastName = user.getLastName();
        this.email = user.getEmail();
        this.activated = user.isActivated();
        this.langKey = user.getLangKey();
        this.registerDate = user.getRegisterDate();
        this.authorities = user.getAuthorities().stream()
                .map(Authority::getName)
                .collect(Collectors.toSet());
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getLogin() {
        return login;
    }

    public void setLogin(String login) {
        this.login = login;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public boolean isActivated() {
        return activated;
    }

    public void setActivated(boolean activated) {
        this.activated = activated;
    }

    public String getLangKey() {
        return langKey;
    }

    public void setLangKey(String langKey) {
        this.langKey = langKey;
    }

    public ZonedDateTime getRegisterDate() {
        return registerDate;
    }

    public void setRegisterDate(ZonedDateTime registerDate) {
        this.registerDate = registerDate;
    }

    public Set<String> getAuthorities() {
        return authorities;
    }

    public void setAuthorities(Set<String> authorities) {
        this.authorities = authorities;
    }
}