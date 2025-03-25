package org.example.backend.objects;

import jakarta.persistence.*;
import org.springframework.data.annotation.Id;

@Entity
@Table(name = "istmed")
public class Iste {

    @jakarta.persistence.Id
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "reis_id")
    private Lend lend;
    private int reanumber;
    private String istmetaht;
    private boolean kasvaba;
    private String istmetyyp;

    public Iste(Long id, Lend lend, int reanumber, String istmetaht, boolean kasvaba, String istmetyyp) {
        this.id = id;
        this.lend = lend;
        this.reanumber = reanumber;
        this.istmetaht = istmetaht;
        this.kasvaba = kasvaba;
        this.istmetyyp = istmetyyp;
    }

    // Getters and setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public int getReanumber() {
        return reanumber;
    }

    public void setReanumber(int reanumber) {
        this.reanumber = reanumber;
    }

    public String getIstmetaht() {
        return istmetaht;
    }

    public void setIstmetaht(String istmetaht) {
        this.istmetaht = istmetaht;
    }

    public boolean isKasvaba() {
        return kasvaba;
    }

    public void setKasvaba(boolean kasvaba) {
        this.kasvaba = kasvaba;
    }

    public String getIstmetyyp() {
        return istmetyyp;
    }

    public void setIstmetyyp(String istmetyyp) {
        this.istmetyyp = istmetyyp;
    }

    public Lend getLend() {
        return lend;
    }

    public void setLend(Lend lend) {
        this.lend = lend;
    }
}
