package org.example.backend.objects;

import jakarta.persistence.*;

import java.time.LocalDateTime;
import java.util.Date;


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
    private LocalDateTime lennuaeg;
    private Date kuupaev;
    private Double hind;
    private String lennufirma;



    public Lend(String sihtkoht, String alguskoht, LocalDateTime lennuaeg, Double hind, Date kuupaev, String lennufirma) {
        this.sihtkoht = sihtkoht;
        this.alguskoht = alguskoht;
        this.lennuaeg = lennuaeg;
        this.kuupaev = kuupaev;
        this.hind = hind;
        this.lennufirma = lennufirma;

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

    public String getLennufirma() {
        return lennufirma;
    }

    public void setLennufirma(String lennufirma) {
        this.lennufirma = lennufirma;
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
