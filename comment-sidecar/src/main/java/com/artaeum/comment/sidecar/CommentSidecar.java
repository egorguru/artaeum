package com.artaeum.comment.sidecar;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.cloud.netflix.sidecar.EnableSidecar;

@SpringBootApplication
@EnableSidecar
@EnableDiscoveryClient
public class CommentSidecar {

    public static void main(String[] args) {
        SpringApplication.run(CommentSidecar.class, args);
    }
}
