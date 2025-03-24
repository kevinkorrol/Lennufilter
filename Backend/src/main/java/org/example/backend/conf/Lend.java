package org.example.backend.conf;

import jakarta.persistence.*;

import java.time.LocalDateTime;
import java.util.Date;


@Entity(name = "Lend")
@Table(name = "reisid")


public class Lend {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String sihtkoht;

    private String alguskoht;


    private LocalDateTime lennuaeg;

    private Double hind;

    private Date kuupaev;


    public Lend(String sihtkoht, String alguskoht, LocalDateTime lennuaeg, Double hind, Date kuupaev) {
        this.sihtkoht = sihtkoht;
        this.alguskoht = alguskoht;
        this.lennuaeg = lennuaeg;
        this.hind = hind;
        this.kuupaev = kuupaev;
    }

    public String getAlguskoht() {
        return alguskoht;
    }

    public void setAlguskoht(String alguskoht) {
        this.alguskoht = alguskoht;
    }

    public Date getKuupaev() {
        return kuupaev;
    }

    public void setKuupaev(Date kuupaev) {
        this.kuupaev = kuupaev;
    }

    // Getters and setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getSihtkoht() {
        return sihtkoht;
    }

    public void setSihtkoht(String sihtkoht) {
        this.sihtkoht = sihtkoht;
    }

    public LocalDateTime getLennuaeg() {
        return lennuaeg;
    }

    public void setLennuaeg(LocalDateTime lennuaeg) {
        this.lennuaeg = lennuaeg;
    }

    public Double getHind() {
        return hind;
    }

    public void setHind(Double hind) {
        this.hind = hind;
    }
}
