package com.artaeum.profile.client;

import com.artaeum.profile.client.model.Image;
import com.artaeum.profile.config.FeignClientConfig;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@FeignClient(value = "storage", configuration = FeignClientConfig.class)
public interface StorageClient {

    @PostMapping("/storage/images/{resource}")
    void save(@RequestBody Image image, @PathVariable String resource);

    @DeleteMapping("/storage/images/{resource}/{name:.+}")
    void delete(@PathVariable String resource, @PathVariable String name);
}
