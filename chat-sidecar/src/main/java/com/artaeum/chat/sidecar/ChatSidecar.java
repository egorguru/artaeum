package com.artaeum.chat.sidecar;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.cloud.netflix.sidecar.EnableSidecar;

@SpringBootApplication
@EnableSidecar
@EnableDiscoveryClient
public class ChatSidecar {

    public static void main(String[] args) {
        SpringApplication.run(ChatSidecar.class, args);
    }
}
