package com.artaeum.profile.controller;

import com.artaeum.profile.controller.error.NotFoundException;
import com.artaeum.profile.controller.utils.PaginationUtil;
import com.artaeum.profile.dto.PostDTO;
import com.artaeum.profile.service.PostService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/posts")
public class PostController {

    private PostService postService;

    public PostController(PostService postService) {
        this.postService = postService;
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public void create(@RequestBody @Valid PostDTO postDTO, Principal principal) {
        postDTO.setUserLogin(principal.getName());
        this.postService.create(postDTO);
    }

    @PutMapping
    @ResponseStatus(HttpStatus.OK)
    public void update(@RequestBody @Valid PostDTO postDTO, Principal principal) {
        this.postService.get(postDTO.getId())
                .filter(p -> p.getUserLogin().equals(principal.getName()))
                .ifPresent(post -> this.postService.update(postDTO));
    }

    @GetMapping("/{id}")
    public ResponseEntity<PostDTO> get(@PathVariable Long id) {
        return this.postService.get(id)
                .map(post -> new ResponseEntity<>(post, HttpStatus.OK))
                .orElseThrow(NotFoundException::new);
    }

    @GetMapping
    public ResponseEntity<List<PostDTO>> getAllPosts(Pageable pageable) {
        Page<PostDTO> page = this.postService.getAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/posts");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public void delete(@PathVariable Long id, Principal principal) {
        this.postService.get(id)
                .filter(p -> p.getUserLogin().equals(principal.getName()))
                .ifPresent((post) -> this.postService.delete(post.getId()));
    }
}
