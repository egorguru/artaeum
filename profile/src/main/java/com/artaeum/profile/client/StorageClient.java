package com.artaeum.profile.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.core.io.Resource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@FeignClient("storage")
public interface StorageClient {

    @GetMapping("/{resource}/{name:.+}")
    ResponseEntity<Resource> get(@PathVariable String resource, @PathVariable String name);

    @PostMapping("/{resource}")
    void save(@RequestParam("image") MultipartFile image,
              @PathVariable String resource,
              @RequestParam("imageName") String name);

    @DeleteMapping("/{resource}/{name:.+}")
    void delete(@PathVariable String resource, @PathVariable String name);
}
