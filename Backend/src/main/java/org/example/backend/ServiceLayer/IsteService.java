package org.example.backend.ServiceLayer;

import org.example.backend.Repos.IsteRepo;
import org.example.backend.objects.Iste;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import java.util.List;

//Äriloogika ja andmete vahendamine Repo ja API vahel


@Service
public class IsteService {

    private IsteRepo isteRepo;

    @Autowired
    public IsteService(IsteRepo isteRepo){
        this.isteRepo = isteRepo;
    }

    public List<Iste> getIste(){
        return isteRepo.findAll();
    }

    public void lisaUusIste(Iste iste){
        isteRepo.save(iste);
    }

    public List<Iste> getIstekohadByLennuId(Long lennuId) {
        return isteRepo.findByLendId(lennuId);
    }
}
