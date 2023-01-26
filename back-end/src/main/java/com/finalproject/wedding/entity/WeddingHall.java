package com.finalproject.wedding.entity;

import lombok.Data;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "weddinghall") // 예식홀 DB관련 Entity
@Data
public class WeddingHall {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int whidx; // 예식홀 구분 번호 컬럼

    @Column(nullable = false, length = 30)
    private String whname; // 예식홀 명칭 컬럼

    @Column(nullable = false)
    private int whamount; // 예식홀 수용인원 컬럼

//    @Column(nullable = false, length = 30)
//    private String whtype; // 예식홀 타입 컬럼

    @Column(length = 5000)
    private String whstr; // 예식홀 상세 내용 컬럼

    @Column(nullable = false)
    private int bmin; // 뷔페 최소인원 컬럼

    @Column(nullable = false)
    private int bmax; // 뷔페 최대 인원 컬럼

    @Column(columnDefinition = "int default -1")
    private int bprice; // 뷔페 1인 식대 컬럼

    @Column(nullable = false, length = 10)
    private String whkind; // 웨딩홀 예식 유형 컬럼 , 교회. 야외, 전통혼례,,

    @Column(columnDefinition = "int default -1")
    private int whprice; //  웨딩홀 총 가격 컬럼
    @Column
    private int whwcidx;

    @Column
    private String whimg2;

    @Transient
    private List<Dib> whdList;     //WeddingHall에서 사용할 Dib 리스트
    @Transient
    private Reservations whrList;     //WeddingHall에서 사용할 Reservations 리스트
    @Transient
    private List<Files> whfList;     //WeddingHall에서 사용할 파일 리스트
    @Transient
    private WeddingComp whwc;
}
