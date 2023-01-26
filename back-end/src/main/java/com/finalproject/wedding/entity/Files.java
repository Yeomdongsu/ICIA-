package com.finalproject.wedding.entity;

import lombok.Data;

import javax.persistence.*;

@Entity
@Table(name = "file") // 파일 DB 관련 Entity
@Data
public class Files {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int fnum; // 파일 구분 번호 컬럼

    @Column(nullable = false)
    private String foriname; // 파일 원본 이름 컬럼

    @Column(nullable = false, length = 30)
    private String fsysname; // 파일 시스템 이름 컬럼

    // 커뮤니티카테고리 / 웨딩홀 / 스드메 / ...
    @Column(nullable = false, length = 10)
    private String ftype; // 파일 타입 컬럼

    // 연결된 게시글 번호 확인을 위한 컬럼추가
    @Column(name = "fid")
    private int fid;


    @Column
    private int fwhidx;
    @Column
    private int fsidx;
    @Column
    private int fpid;
    @Column
    private int fhid;
    @Column
    private int feid;





//    @ManyToOne
//    @JoinColumn(name = "sidx", nullable = true)
//    private SDM sdix; // 스드메 외래키

//    @ManyToOne
//    @JoinColumn(name = "pidx", nullable = true)
//    private Planner planner; // 플래너 외래키
//
//    @ManyToOne
//    @JoinColumn(name = "sidx", nullable = true)
//    private sdm sdix; // 스드메 외래키
//
//    @ManyToOne
//    @JoinColumn(name = "hidx", nullable = true)
//    private HoneyMoon honeyMoon; // 허니문 외래키
//
//    @ManyToOne
//    @JoinColumn(name = "whidx", nullable = true)
//    private WeddingHall weddinghall; // 웨딩홀 외래키
//
//    @ManyToOne
//    @JoinColumn(name = "bno", nullable = true)
//    private Board board;



    /*
    @ManyToOne
    @JoinColumn(name = "fnum", nullable = false)
    private File file; // sdm 테이블 외래키
     */
}
