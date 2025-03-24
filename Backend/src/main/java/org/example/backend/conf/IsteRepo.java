package org.example.backend.conf;


import org.example.backend.conf.Iste;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IsteRepo extends JpaRepository<Iste, Long> {
    List<Iste> findByLendId(Long lendId);
}
