package com.artaeum.profile.controller;

import com.artaeum.profile.client.StorageClient;
import com.artaeum.profile.config.Constants;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.security.Principal;

@RestController
@RequestMapping("/images")
public class ProfileImagesController {

    private StorageClient storageClient;

    public ProfileImagesController(StorageClient storageClient) {
        this.storageClient = storageClient;
    }

    @PostMapping("/avatar")
    public void saveAvatarForUser(@RequestParam("image") MultipartFile image, Principal principal) {
        this.storageClient.save(image, Constants.RESOURCE_NAME, String.format("avatar-%s", principal.getName()));
    }

    @PostMapping("/background")
    public void saveBackgroundForUser(@RequestParam("image") MultipartFile image, Principal principal) {
        this.storageClient.save(image, Constants.RESOURCE_NAME, String.format("background-%s", principal.getName()));
    }
}
