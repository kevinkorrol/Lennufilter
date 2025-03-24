package org.example.backend.conf;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.beans.factory.annotation.Autowired;

@Configuration
public class DBCONF {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Bean
    public CommandLineRunner initDatabase() {
        return args -> {
            String createFlightsTable = "CREATE TABLE IF NOT EXISTS reisid (" +
                    "id SERIAL PRIMARY KEY, " +
                    "sihtkoht VARCHAR(255) NOT NULL, " +
                    "kuupäev TIMESTAMP NOT NULL, " +
                    "lennuaeg INTERVAL" +
                    "hind DECIMAL(10, 2) NOT NULL);";
            jdbcTemplate.execute(createFlightsTable);

            String createSeatsTable = "CREATE TABLE IF NOT EXISTS istmed (" +
                    "id SERIAL PRIMARY KEY, " +
                    "reisi_id INT, " +
                    "reanumber INT, " +
                    "istme_tahis CHAR(1), " +
                    "kasvaba BOOLEAN, " +
                    "istmeliik VARCHAR(50), " +
                    "FOREIGN KEY (flight_id) REFERENCES flights(id));";
            jdbcTemplate.execute(createSeatsTable);
        };
    }
}

