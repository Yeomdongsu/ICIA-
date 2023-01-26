package com.finalproject.wedding.entity;

import lombok.Data;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "dib") // 찜목록 DB 관련 Entity
@Data
public class Dib {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int didx; // 찜목록 구분번호 컬럼

    @Column(nullable = false, length = 10)
    private String dtype; // 찜목록 종류 컬럼


    @Column
    private String dmid;
    @Column
    private int dwhidx;  // Dib 테이블의 외래키 역할 findBySdidx 이용할 것
    @Column
    private int dsidx;  // Dib 테이블의 외래키 역할 findBySdidx 이용할 것
    @Column
    private int dpidx;  // Dib 테이블의 외래키 역할 findBySdidx 이용할 것
    @Column
    private int dhidx;  // Dib 테이블의 외래키 역할 findBySdidx 이용할 것
    @Column
    private int deidx;  // Dib 테이블의 외래키 역할 findBySdidx 이용할 것

    // 외래키
//    @ManyToOne
//    @JoinColumn(name ="mid",nullable = false)
//    private Member member; // member 테이블 외래키
//
//    @ManyToOne
//    @JoinColumn(name = "hidx")
//    private HoneyMoon honeymoon; // HoneyMoon 테이블 외래키
//
//    @ManyToOne
//    @JoinColumn(name = "pidx")
//    private Planner planner; // Planner 테이블 외래키
//
//    @ManyToOne
//    @JoinColumn(name = "sidx")
//    private SDM sdm; // SDM 테이블 외래키
//
//    @ManyToOne
//    @JoinColumn(name = "whidx")
//    private WeddingHall weddinghall; // Wedding Hall 테이블 외래키
//
//    @ManyToOne
//    @JoinColumn(name = "widx")
//    private WeddingComp weddingcomp; // Wedding Company 테이블 외래키
//
//    @ManyToOne
//    @JoinColumn(name="eidx")
//    private Event event; // Event 테이블 외래키
}
