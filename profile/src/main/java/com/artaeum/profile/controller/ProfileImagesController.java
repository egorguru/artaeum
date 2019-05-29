package com.artaeum.profile.controller;

import com.artaeum.profile.client.StorageClient;
import com.artaeum.profile.client.model.Image;
import com.artaeum.profile.config.Constants;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;

@RestController
@RequestMapping("/images")
public class ProfileImagesController {

    private StorageClient storageClient;

    public ProfileImagesController(StorageClient storageClient) {
        this.storageClient = storageClient;
    }

    @PostMapping("/avatar")
    public void saveAvatarForUser(@RequestParam String image, Principal principal) {
        this.storageClient.save(
                new Image(image, String.format("%s-avatar", principal.getName())),
                Constants.RESOURCE_NAME);
    }

    @PostMapping("/background")
    public void saveBackgroundForUser(@RequestParam String image, Principal principal) {
        this.storageClient.save(
                new Image(image, String.format("%s-background", principal.getName())),
                Constants.RESOURCE_NAME);
    }
}
