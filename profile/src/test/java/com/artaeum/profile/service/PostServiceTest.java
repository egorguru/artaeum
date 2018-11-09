package com.artaeum.profile.service;

import com.artaeum.profile.domain.Post;
import com.artaeum.profile.repository.PostRepository;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.PageRequest;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;

import static org.junit.Assert.*;

@RunWith(SpringRunner.class)
@SpringBootTest
@DirtiesContext(classMode = DirtiesContext.ClassMode.BEFORE_EACH_TEST_METHOD)
public class PostServiceTest {

    private static final String USER_ID = "uuid-123";

    @Autowired
    private PostRepository postRepository;

    @Autowired
    private PostService postService;

    @Test
    @Transactional
    public void whenCreatePost() {
        Post postDTO = new Post();
        postDTO.setText("test text");
        postDTO.setUserId(USER_ID);
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
        post.setCreatedDate(Instant.now());
        post.setUserId(USER_ID);
        post = this.postRepository.save(post);
        Post updatePost = new Post(post.getId(), USER_ID, "user", Instant.now());
        this.postService.update(updatePost);
        Post result = this.postRepository.getOne(1L);
        assertEquals(updatePost.getText(), result.getText());
        assertEquals(post.getCreatedDate(), result.getCreatedDate());
        assertEquals(post.getUserId(), result.getUserId());
    }

    @Test
    public void whenGetPost() {
        Post post = new Post();
        post.setText("test text");
        post.setCreatedDate(Instant.now());
        post.setUserId(USER_ID);
        post = this.postRepository.save(post);
        Post result = this.postService.get(post.getId()).get();
        assertEquals(post.getText(), result.getText());
        assertEquals(USER_ID, result.getUserId());
        assertEquals(post.getCreatedDate(), result.getCreatedDate());
    }

    @Test
    @Transactional
    public void whenDeletePost() {
        Post post = new Post();
        post.setText("test text");
        post.setCreatedDate(Instant.now());
        post.setUserId(USER_ID);
        post = this.postRepository.save(post);
        assertNotNull(this.postRepository.getOne(post.getId()));
        this.postService.delete(post);
        assertFalse(this.postRepository.findById(post.getId()).isPresent());
    }

    @Test
    @Transactional
    public void whenSearchPost() {
        Post post = new Post();
        post.setText("test text");
        post.setCreatedDate(Instant.now());
        post.setUserId(USER_ID);
        post = this.postRepository.save(post);
        Post result = this.postService
                .search(PageRequest.of(0, 2), "text")
                .getContent().get(0);
        assertEquals(post.getText(), result.getText());
    }
}
