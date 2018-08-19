package com.artaeum.uaa.repository;

import com.artaeum.uaa.domain.Authority;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AuthorityRepository extends JpaRepository<Authority, String> {

    Authority findByName(String name);
}
