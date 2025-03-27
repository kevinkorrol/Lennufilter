package org.example.backend.conf;

import org.example.backend.Repos.LendRepo;
import org.example.backend.objects.Lend;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.annotation.Order;

import java.time.Duration;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.List;

@Configuration
public class LendConf {

    @Bean(name = "lendCommandLineRunner")
    @Order(1)
    CommandLineRunner commandLineRunner(LendRepo repo){
        return args -> {
            Lend tallinnPariis = new Lend(
                    "Pariis",
                    "Tallinn",
                    3.5,
                    200.0,
                    LocalDate.of(2025, 3, 25),
                    "RyanAir"
            );

            Lend tallinnLondon = new Lend(
                    "London",
                    "Tallinn",
                    4.3,
                    150.0,
                    LocalDate.of(2025, 3, 27),
                    "RyanAir"
            );
            repo.saveAll(List.of(tallinnPariis, tallinnLondon));
        };

    }
}
