package org.example.backend.Repos;


import org.example.backend.objects.Lend;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;


@Repository
public interface LendRepo extends JpaRepository<Lend, Long> {

    List<Lend> findAll();
}
