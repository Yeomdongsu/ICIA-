package com.finalproject.wedding.entity;

import lombok.Data;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.sql.Timestamp;

@Entity
@Table(name = "reservations") // 예약 DB 관련 Entity
@Data
public class Reservations {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int ridx; // 예약 구분 번호 컬럼

    @Column(nullable = false)
    @CreationTimestamp
    private Timestamp rdate; // 예약 날짜 컬럼

    @Column(nullable = false)
    private int rcost; // 예약 금액 컬럼

    @Column(nullable = false, length = 10)
    private String rtype; // 예약 종류 컬럼

    @Column(nullable = false, length = 10)
    @ColumnDefault("'진행예정'")
    private String rstatus; // 예약 진행 상황 컬럼
    @Column(nullable = true, length = 10)
    private String rdatestart; // 예약 진행 상황 컬럼
    @Column(nullable = true, length = 10)
    private String rdateend; // 예약 진행 상황 컬럼
    @Column(nullable = true, length = 10)
    private String rperson; // 예약 진행 상황 컬럼

    @Column
    private String rmid;
    @Column
    private Integer rwhidx;  // Dib 테이블의 외래키 역할 findBySdidx 이용할 것
    @Column
    private Integer rsidx;  // Dib 테이블의 외래키 역할 findBySdidx 이용할 것
    @Column
    private Integer rpidx;  // Dib 테이블의 외래키 역할 findBySdidx 이용할 것
    @Column
    private Integer rhidx;  // Dib 테이블의 외래키 역할 findBySdidx 이용할 것
    @Column
    private Integer reidx;  // Dib 테이블의 외래키 역할 findBySdidx 이용할 것
    @Column(nullable = false)
    private String rimpuid; // 환불할때 사용될 값

    // 외래키
//    @ManyToOne
//    @JoinColumn(name = "mid", nullable = false)
//    private Member member; // member 테이블 외래키
//
//    @ManyToOne
//    @JoinColumn(name = "hidx", nullable = true)
//    private HoneyMoon honeymoon; // HoneyMoon 테이블 외래키
//
//    @ManyToOne
//    @JoinColumn(name = "pidx", nullable = true)
//    private Planner planner; // Planner 테이블 외래키
//
//    @ManyToOne
//    @JoinColumn(name = "sidx", nullable = true)
//    private SDM sdm; // SDM 테이블 외래키
//
//    @ManyToOne
//    @JoinColumn(name = "whidx", nullable = true)
//    private WeddingHall weddinghall; // Wedding Hall 테이블 외래키
//
//    @ManyToOne
//    @JoinColumn(name = "widx", nullable = true)
//    private WeddingComp weddingcomp; // Wedding Company 테이블 외래키
//
//    @ManyToOne
//    @JoinColumn(name="eidx", nullable = true)
//    private Event events; // Event 테이블 외래키
}
