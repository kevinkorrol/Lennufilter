package org.example.backend.objects;

import jakarta.persistence.*;


//Entity klass ehk määran ära, milline peab olema Iste objekt ning kuidas ta andmebaasi talletatakse

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
    @JoinColumn(name = "lend_id")
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
