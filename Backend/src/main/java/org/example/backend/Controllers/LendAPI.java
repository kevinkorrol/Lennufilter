package org.example.backend.Controllers;

import org.example.backend.ServiceLayer.LendService;
import org.example.backend.objects.Lend;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "api/lend")
public class LendAPI {
    private LendService lendService;

    @Autowired
    public LendAPI(LendService lendService) {
        this.lendService = lendService;
    }

    @GetMapping
    public List<Lend> getLend(){
        return lendService.getLend();
    }

    @PostMapping
    public void lisaLend(@RequestBody Lend lend){
        lendService.lisaUusLend(lend);
    }
}
