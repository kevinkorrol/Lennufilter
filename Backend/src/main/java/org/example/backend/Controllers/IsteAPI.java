package org.example.backend.Controllers;

import org.example.backend.ServiceLayer.IsteService;
import org.example.backend.objects.Iste;
import org.example.backend.objects.Lend;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "api/iste")

public class IsteAPI {
    private IsteService isteService;

    @Autowired
    public IsteAPI(IsteService isteService) {
        this.isteService = isteService;
    }

    @GetMapping

    public List<Iste> getIste(){
        return isteService.getIste();
    }

    @PostMapping
    public void lisaIste(@RequestBody Iste iste){
        isteService.lisaUusIste(iste);
    }
}
