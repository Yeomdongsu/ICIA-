package com.finalproject.wedding.entity;

import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import javax.persistence.*;
import java.sql.Timestamp;
import java.util.List;

@Entity
@Data
@Table(name = "board") // 게시판 DB 관련 Entity
public class Board {
    @Id // PK(기본키) 설정 어노테이션
    @GeneratedValue(strategy = GenerationType.IDENTITY) // AUTO INCREMENT 값 설정을 위한 어노테이션
    private int bno; // 게시판 구분 번호 컬럼

    @Column(nullable = false, length = 20)
    private String btype; // 게시판 종류 컬럼

    @Column(nullable = false, length = 100)
    private String btitle; // 게시판 제목 컬럼

    @Column(nullable = false, length = 5000) // @Column에서 length를 생략할 경우 해당 변수 타입의 최대 길이로 지정된다.
    private String bstr; // 게시판 상세 내용 컬럼

    @CreationTimestamp // Insert 쿼리가 발생할 때 현재 시간 값을 적용시키는 어노테이션
    @Column(nullable = false)
    private Timestamp bdate; // 게시판 작성일 컬럼

    // String 외의 값을 Default로 지정하기 위해서는 columnDefinition 속성이 필요
    // columnDefinition = "변수타입 default 기본값" 형식으로 작성
    @Column(nullable = false, columnDefinition = "int default 0")
    private int bview; // 게시판 조회수 컬럼

    @Column(nullable = true, length = 10)
    private String bpwd; // 게시판 비밀번호 컬럼

    // 외래키 비 식별 관계
//    @ManyToOne
//    @JoinColumn(name = "mid", nullable = false)
//    private Member member; // member 테이블에서 가져온 외래키

    @Column
    private String bmid;

//    @Column
//    private String bdecidx;

    @Transient
    private List<Files> bfList;
    @Transient
    private List<Comment> cfList;
}
