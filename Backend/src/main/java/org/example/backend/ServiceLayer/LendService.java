package org.example.backend.ServiceLayer;

import org.example.backend.Repos.LendRepo;
import org.example.backend.objects.Lend;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LendService {

    private final LendRepo lendRepo;

    @Autowired
    public LendService(LendRepo lendRepo) {
        this.lendRepo = lendRepo;
    }

    public List<Lend> getLend(){
        return lendRepo.findAll();
    }
}
