package org.example.backend.objects;

import jakarta.persistence.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.Duration;

//Entity klass ehk määran ära, milline peab olema Lend objekt ning kuidas ta andmebaasi talletatakse

@Entity(name = "lend")
@Table(name = "lennud")


public class Lend {

    @Id
    @SequenceGenerator(
            name = "lend_sequence",
            sequenceName = "lend_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "lend_sequence"
    )

    private Long id;
    private String sihtkoht;
    private String alguskoht;
    private Double lennuaeg;
    private LocalDate kuupaev;
    private Double hind;
    private String lennufirma;



    public Lend(String sihtkoht, String alguskoht, Double lennuaeg, Double hind, LocalDate kuupaev, String lennufirma) {
        this.sihtkoht = sihtkoht;
        this.alguskoht = alguskoht;
        this.lennuaeg = lennuaeg;
        this.kuupaev = kuupaev;
        this.hind = hind;
        this.lennufirma = lennufirma;

    }

    public Lend() {

    }


    @Override
    public String toString() {
        return "Lend{" +
                "id=" + id +
                ", sihtkoht='" + sihtkoht + '\'' +
                ", alguskoht='" + alguskoht + '\'' +
                ", lennuaeg=" + lennuaeg +
                ", kuupaev=" + kuupaev +
                ", hind=" + hind +
                ", lennufirma='" + lennufirma + '\'' +
                '}';
    }
}
