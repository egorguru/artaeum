package com.artaeum.profile.service;

import com.artaeum.profile.domain.Post;
import com.artaeum.profile.repository.PostRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.Optional;

@Service
@Transactional
public class PostService {

    private PostRepository postRepository;

    public PostService(PostRepository postRepository) {
        this.postRepository = postRepository;
    }

    public void create(Post post) {
        post.setCreatedDate(Instant.now());
        this.postRepository.save(post);
    }

    public void update(Post post) {
        this.postRepository
                .findById(post.getId())
                .ifPresent((p) -> p.setText(post.getText()));
    }

    public Optional<Post> get(Long id) {
        return this.postRepository.findById(id);
    }

    public Page<Post> getAll(Pageable pageable) {
        return this.postRepository.findAll(pageable);
    }

    public Page<Post> getAllByUserId(Pageable pageable, String userId) {
        return this.postRepository.findAllByUserId(pageable, userId);
    }

    public Page<Post> search(Pageable pageable, String query) {
        return this.postRepository.findAllByTextContainingOrTextLike(pageable, query, query);
    }

    public void delete(Post post) {
        this.postRepository.delete(post);
    }
}
