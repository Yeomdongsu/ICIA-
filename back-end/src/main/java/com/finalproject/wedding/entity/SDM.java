package com.finalproject.wedding.entity;

import lombok.Data;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "sdm") // 스드메 DB 관련 Entity
@Data
public class SDM {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int sidx; // 스드메 구분 번호 컬럼

    @Column(nullable = false, length = 45)
    private String scomp; // 스드메 업체명 컬럼

    @Column(nullable = false, length = 11)
    private String sphone; // 스드메 연락처 컬럼

    @Column(nullable = false)
    private String slocation; // 스드메 위치 컬럼

    @Column(nullable = false)
    private String slocation2; // 스드메 상세위치 컬럼

    @Column(columnDefinition = "int default -1")
    private int sprice; // 스드메 가격 컬럼

    @Column(length = 5000)
    private String sstr; // 스드메 상세 내역 컬럼

    @Column
    private String simg; // 스드메 이미지 파일 컬럼

    @Column
    private String simg2;

    @Transient
    private List<Dib> sdList;     //SDM에서 사용할 Dib 리스트
    @Transient
    private Reservations srList;     //SDM에서 사용할 Reservations 리스트
    @Transient
    private List<Files> sfList;     //SDM에서 사용할 파일 리스트
}
