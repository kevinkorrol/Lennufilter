package org.example.backend.conf;

import org.example.backend.Repos.IsteRepo;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;

import java.util.*;

public class IsteConf {


    private static List<String> koikKohad(){
        int ridadeArv = 30;
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

    @Bean
    CommandLineRunner commandLineRunner(IsteRepo repo){//Loob andmebaasi kirjed
        List<String> koikKohad = koikKohad();

        return args -> {//Genereerin igale lennule suvaliselt kinnised kohad
            List<String> kinni = kinnisedKohad(70);
            //Siia on vaja mingit findAll(lennud) meetodit, mis leiaks mulle kõik lennud
            //For lend in lennud
            //For koht in lend
            //Loon uue Iste isendi:
            //If lend in kinni siis kinni = true
            //A, F - akna all
            //C, D - rohkem ruumi
            //Read 1 kuni 5, a-5 kuni 5 - lähedal väljapääsule
        };
    }
}
