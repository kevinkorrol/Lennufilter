package org.example.backend.objects;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IsteRepo extends JpaRepository<Iste, Long> {
    List<Iste> findByLendId(Long lendId);
}
