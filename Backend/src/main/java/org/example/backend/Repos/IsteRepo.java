package org.example.backend.Repos;


import org.example.backend.objects.Iste;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IsteRepo extends JpaRepository<Iste, Long> {
}
