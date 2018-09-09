package com.artaeum.profile.controller;

import com.artaeum.profile.client.UaaClient;
import com.artaeum.profile.config.Constants;
import org.apache.tomcat.util.http.fileupload.FileUtils;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.core.io.Resource;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockHttpServletRequestBuilder;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.Collections;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@RunWith(SpringRunner.class)
@SpringBootTest
public class ProfileImagesControllerTest {

    @Value("classpath:image.png")
    private Resource imagePNG;

    @MockBean
    private UaaClient uaaClient;

    @Autowired
    private ProfileImagesController profileImagesController;

    private MockMvc mockMvc;

    @Before
    public void init() {
        this.mockMvc = MockMvcBuilders
                .standaloneSetup(this.profileImagesController)
                .build();
    }

    @Test
    public void whenGetNotExistingAvatarImage() throws Exception {
        this.mockMvc.perform(get("/images/avatar/testtest.jpg"))
                .andExpect(status().isNotFound());
    }

    @Test
    public void whenGetNotExistingBackgroundImage() throws Exception {
        this.mockMvc.perform(get("/images/background/testtest.png"))
                .andExpect(status().isNotFound());
    }

    @Test
    public void whenUploadAvatarImageAndGetIt() throws Exception {
        MockMultipartFile file = new MockMultipartFile("image", "testimage.png", "image/png", Files.readAllBytes(Paths.get(this.imagePNG.getURI())));

        MockHttpServletRequestBuilder builder = MockMvcRequestBuilders
                .multipart("/images/avatar")
                .file(file)
                .principal(new UsernamePasswordAuthenticationToken("testuser", "password", Collections.emptyList()));

        this.mockMvc.perform(builder).andExpect(status().isOk());

        this.mockMvc.perform(get("/images/avatar/testuser.jpg"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.IMAGE_JPEG));
    }

    @Test
    public void whenUploadBackgroundImageAndGetIt() throws Exception {
        MockMultipartFile file = new MockMultipartFile("image", "testimage.png", "image/png", Files.readAllBytes(Paths.get(this.imagePNG.getURI())));

        MockHttpServletRequestBuilder builder = MockMvcRequestBuilders
                .multipart("/images/background")
                .file(file)
                .principal(new UsernamePasswordAuthenticationToken("testuser", "password", Collections.emptyList()));

        this.mockMvc.perform(builder).andExpect(status().isOk());

        this.mockMvc.perform(get("/images/background/testuser.jpg"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.IMAGE_JPEG));
    }

    @After
    public void clear() throws IOException {
        FileUtils.deleteDirectory(new File(Paths.get(Constants.IMAGE_STORAGE_DIR).toUri()));
    }
}
