package org.example.backend.Controllers;

import org.example.backend.ServiceLayer.IsteService;
import org.example.backend.objects.Iste;
import org.example.backend.objects.Lend;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "api")
@CrossOrigin(origins = "http://localhost:3000")
public class IsteAPI {
    private IsteService isteService;

    @Autowired
    public IsteAPI(IsteService isteService) {
        this.isteService = isteService;
    }

    @GetMapping("/istmed")
    public List<Iste> getIste(){
        return isteService.getIste();
    }

    @GetMapping("/lend/{lennuId}")
    public List<Iste> getIstekohadByLennuId(@PathVariable("lennuId") Long lennuId) {
        return isteService.getIstekohadByLennuId(lennuId);
    }

    @PostMapping
    public void lisaIste(@RequestBody Iste iste){
        isteService.lisaUusIste(iste);
    }
}
