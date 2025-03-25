package org.example.backend.Repos;


import org.example.backend.objects.Lend;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface LendRepo extends JpaRepository<Lend, Long> {

}
