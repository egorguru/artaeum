package com.artaeum.profile.service;

import com.artaeum.profile.client.UaaClient;
import com.artaeum.profile.domain.Post;
import com.artaeum.profile.dto.PostDTO;
import com.artaeum.profile.repository.PostRepository;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.transaction.annotation.Transactional;

import java.time.ZonedDateTime;

import static org.junit.Assert.*;
import static org.mockito.Mockito.when;

@RunWith(SpringRunner.class)
@SpringBootTest
@DirtiesContext(classMode = DirtiesContext.ClassMode.BEFORE_EACH_TEST_METHOD)
public class PostServiceTest {

    private static final String USER_LOGIN = "login";

    private static final Long USER_ID = 123L;

    @Autowired
    private PostRepository postRepository;

    @Autowired
    private PostService postService;

    @MockBean
    private UaaClient uaaClient;

    @Before
    public void init() {
        when(this.uaaClient.getUserIdByLogin(USER_LOGIN)).thenReturn(USER_ID);
        when(this.uaaClient.getUserLoginById(USER_ID)).thenReturn(USER_LOGIN);
    }

    @Test
    @Transactional
    public void whenCreatePost() {
        PostDTO postDTO = new PostDTO();
        postDTO.setText("test text");
        postDTO.setUserLogin(USER_LOGIN);
        this.postService.create(postDTO);
        Post result = this.postRepository.getOne(1L);
        assertEquals(postDTO.getText(), result.getText());
        assertEquals(USER_ID, result.getUserId());
        assertNotNull(result.getCreatedDate());
    }

    @Test
    @Transactional
    public void whenUpdatePost() {
        Post post = new Post();
        post.setText("test text");
        post.setCreatedDate(ZonedDateTime.now());
        post.setUserId(USER_ID);
        post = this.postRepository.save(post);
        PostDTO postDTO = new PostDTO(post.getId(), "new text", "user", ZonedDateTime.now());
        this.postService.update(postDTO);
        Post result = this.postRepository.getOne(1L);
        assertEquals(postDTO.getText(), result.getText());
        assertEquals(post.getCreatedDate(), result.getCreatedDate());
        assertEquals(post.getUserId(), result.getUserId());
    }

    @Test
    public void whenGetPost() {
        Post post = new Post();
        post.setText("test text");
        post.setCreatedDate(ZonedDateTime.now());
        post.setUserId(USER_ID);
        post = this.postRepository.save(post);
        PostDTO result = this.postService.get(post.getId()).get();
        assertEquals(post.getText(), result.getText());
        assertEquals(USER_LOGIN, result.getUserLogin());
        assertEquals(post.getCreatedDate(), result.getCreatedDate());
    }

    @Test
    @Transactional
    public void whenDeletePost() {
        Post post = new Post();
        post.setText("test text");
        post.setCreatedDate(ZonedDateTime.now());
        post.setUserId(USER_ID);
        post = this.postRepository.save(post);
        assertNotNull(this.postRepository.getOne(post.getId()));
        this.postService.delete(post.getId());
        assertFalse(this.postRepository.findById(post.getId()).isPresent());
    }
}
