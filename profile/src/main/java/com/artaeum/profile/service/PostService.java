package com.artaeum.profile.service;

import com.artaeum.profile.client.UaaClient;
import com.artaeum.profile.domain.Post;
import com.artaeum.profile.dto.PostDTO;
import com.artaeum.profile.repository.PostRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.ZonedDateTime;
import java.util.Optional;

@Service
public class PostService {

    private PostRepository postRepository;

    private UaaClient uaaClient;

    public PostService(PostRepository postRepository, UaaClient uaaClient) {
        this.postRepository = postRepository;
        this.uaaClient = uaaClient;
    }

    public void create(PostDTO postDTO) {
        Post newPost = new Post();
        Long userId = this.uaaClient.getUserIdByLogin(postDTO.getUserLogin());
        newPost.setUserId(userId);
        newPost.setText(postDTO.getText());
        newPost.setCreatedDate(ZonedDateTime.now());
        this.postRepository.save(newPost);
    }

    public void update(PostDTO post) {
        this.postRepository.findById(post.getId())
                .ifPresent((p) -> p.setText(post.getText()));
    }

    public Optional<PostDTO> get(Long id) {
        return this.postRepository.findById(id).map(this::convert);
    }

    public Page<PostDTO> getAll(Pageable pageable) {
        return this.postRepository.findAll(pageable).map(this::convert);
    }

    public void delete(Long id) {
        this.postRepository.deleteById(id);
    }

    private PostDTO convert(Post p) {
        return new PostDTO(p.getId(), p.getText(), this.uaaClient.getUserLoginById(p.getUserId()), p.getCreatedDate());
    }
}
