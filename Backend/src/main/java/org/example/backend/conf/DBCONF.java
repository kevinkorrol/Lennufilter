package org.example.backend.conf;
import org.springframework.context.annotation.Configuration;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.beans.factory.annotation.Autowired;

@Configuration
public class DBCONF {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    //Lend pariis = new Lend();

}

