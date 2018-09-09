package com.artaeum.profile.service;

import com.artaeum.profile.config.Constants;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;
import java.net.URI;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

/**
 * In future it should be at other microservice like storage-service
 * which will save and return file (images and e.t.c.)
 * Now it is like mock
 */
@Service
public class ImageService {

    public Resource load(String type, String name) throws IOException {
        return new UrlResource(Paths.get(type, name).toUri());
    }

    public void save(MultipartFile file, String type, String name) throws IOException {
        Path dir = Paths.get(type);
        if (!Files.exists(dir)) {
            Files.createDirectories(dir);
        }
        BufferedImage image = ImageIO.read(file.getInputStream());
        URI path = dir.resolve(String.format("%s.%s", name, Constants.DEFAULT_EXPANSION)).toUri();
        ImageIO.write(image, Constants.DEFAULT_EXPANSION, new File(path));
    }
}
