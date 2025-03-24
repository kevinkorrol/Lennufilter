package org.example.backend.objects;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface LendRepo extends JpaRepository<Lend, Long> {

    List<Lend> findBySihtkoht(String sihtkoht);
    List<Lend> findByKuupaev(LocalDate kuupaev);
}
