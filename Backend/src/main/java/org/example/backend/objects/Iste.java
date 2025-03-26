package org.example.backend.objects;

import jakarta.persistence.*;

@Entity(name = "iste")
@Table(name = "istmed")
public class Iste {

    @Id
    @SequenceGenerator(
            name = "iste_sequence",
            sequenceName = "iste_sequence",
            allocationSize = 1
    )
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "lend_id")//enne oli "reis_id"
    private Lend lend;
    private int reanumber;
    private String istmetaht;
    private boolean kasvaba;


    public Iste(Lend lend, int reanumber, String istmetaht, boolean kasvaba) {
        this.lend = lend;
        this.reanumber = reanumber;
        this.istmetaht = istmetaht;
        this.kasvaba = kasvaba;
    }

    public Iste() {

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


    public Lend getLend() {
        return lend;
    }

    public void setLend(Lend lend) {
        this.lend = lend;
    }

    @Override
    public String toString() {
        return "Iste{" +
                ", lend=" + lend +
                ", reanumber=" + reanumber +
                ", istmetaht='" + istmetaht + '\'' +
                ", kasvaba=" + kasvaba +
                '}';
    }
}
