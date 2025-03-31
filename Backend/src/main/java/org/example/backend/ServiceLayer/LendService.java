package org.example.backend.ServiceLayer;

import org.example.backend.Repos.LendRepo;
import org.example.backend.objects.Lend;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.OptionalLong;

//Äriloogika ja andmete vahendamine Repo ja API vahel

@Service
public class LendService {

    private LendRepo lendRepo;

    @Autowired
    public LendService(LendRepo lendRepo) {
        this.lendRepo = lendRepo;
    }

    public List<Lend> getLend(){
        return lendRepo.findAll();
    }

    public void lisaUusLend(Lend lend) {
        lendRepo.save(lend);
    }

    public Optional<Lend> getLendById(Long id) {
        return lendRepo.findById(id);
    }
}
