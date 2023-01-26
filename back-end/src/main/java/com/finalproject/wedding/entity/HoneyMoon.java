package com.finalproject.wedding.entity;

import lombok.Data;
import org.hibernate.annotations.ColumnDefault;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "honey") // 허니문 DB 관련 Entity
@Data
public class HoneyMoon {
    @Id // PK 설정 어노테이션
    @GeneratedValue(strategy = GenerationType.IDENTITY) // AUTO INCREMENT 속성을 지정
    @Column
    private int hidx; // 허니문 구분번호 컬럼

    @Column(nullable = false, length = 45)
    private String hbrand; // 허니문 여행사 컬럼

    @Column(nullable = true, length = 45, columnDefinition = "varchar(45) default '-'")
    private String hlocation; // 허니문 여행지 컬럼

    @Column(nullable = true, length = 10)
    private String harrival; // 허니문 국내 or 국외 선택 컬럼

    @Column(nullable = false, length = 11)
    private String hphone; // 허니문 연락처 컬럼

    @Column(length = 5000)
    private String hstr; // 허니문 상세 내용 컬럼

    @Column(columnDefinition = "int default 0")
    private int hcost; // 허니문 가격 컬럼

    @Column// 이미지 없음 파일을 넣어주세요.
    private String himg;

    @Column //대표사진
    private String himg2;

    @Transient
    private List<Dib> hdList;     //Honeymoon에서 사용할 Dib 리스트
    @Transient
    private Reservations hrList;     //Honeymoon에서 사용할 Reservations 리스트
    @Transient
    private List<Files> hfList;     //HoneyMoon에서 사용할 파일 리스트
}
