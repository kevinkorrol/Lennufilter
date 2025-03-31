package org.example.backend.conf;

import org.example.backend.Repos.IsteRepo;
import org.example.backend.Repos.LendRepo;
import org.example.backend.objects.Iste;
import org.example.backend.objects.Lend;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.annotation.Order;

import java.util.*;

//Loon Iste tüüpi elemente
@Configuration
public class IsteConf {


    private static List<String> koikKohad(){
        int ridadeArv = 15;
        List<String> kohaTahed = Arrays.asList("A", "B", "C", "D", "E", "F");

        List<String> rtr = new ArrayList<>();

        for (int i = 1; i <= ridadeArv; i++){
            for (String s : kohaTahed){
                rtr.add(i + " " + s);
            }
        }

        return rtr;
    }

    private static List<String> kinnisedKohad(int a){
        List<String> kohad = koikKohad();
        List<String> kinni = new ArrayList<>();
        Random random = new Random();
        Collections.shuffle(kohad, random);

        kinni.addAll(kohad.subList(0, a));

        return kinni;
    }

    @Bean(name = "isteCommandLineRunner")
    @Order(2)
    CommandLineRunner commandLineRunner(IsteRepo istmerepo, LendRepo lendRepo){//Loob andmebaasi kirjed
        List<String> koikKohad = koikKohad();

        return args -> {//Genereerin igale lennule suvaliselt kinnised kohad

            List<Lend> lennud = lendRepo.findAll();


            for (Lend lend : lennud){
                List<String> kinni = kinnisedKohad(25);

                for(String koht : koikKohad){

                    String tahis = koht.split(" ")[1];
                    String nr = koht.split(" ")[0];
                    if (kinni.contains(koht)){
                        Iste iste = new Iste(lend, Integer.parseInt(nr), tahis, false);
                        istmerepo.save(iste);
                    }
                }
            }
            //A, F - akna all
            //C, D - rohkem ruumi
            //Read 1 kuni 5, a-4 kuni a - lähedal väljapääsule
        };
    }
}
