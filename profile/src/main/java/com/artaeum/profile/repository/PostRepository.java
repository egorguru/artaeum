package com.artaeum.profile.repository;

import com.artaeum.profile.domain.Post;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PostRepository extends JpaRepository<Post, Long> {

    void deleteById(Long id);

    Page<Post> findAllByUserId(Pageable pageable, String userId);
}
