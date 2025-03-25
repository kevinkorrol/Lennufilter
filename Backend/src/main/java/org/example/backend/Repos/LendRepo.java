package org.example.backend.Repos;


import org.example.backend.objects.Lend;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;


@Repository
public interface LendRepo extends JpaRepository<Lend, Long> {

    // Saaks teha lennu otsimise id või mõne muu parameetri kaudu, kuid millegipärast ei leia lennud tabelit
    //@Query("SELECT lend FROM lennud lend WHERE lend.id =?1")
    //Optional<Lend> findLendById(Long id);
}
