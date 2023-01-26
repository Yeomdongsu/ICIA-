package com.finalproject.wedding.entity;

import lombok.Data;
import org.hibernate.annotations.ColumnDefault;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "event") // 이벤트 DB 관련 Entity
@Data
public class Event {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int eidx; // 이벤트 구분 번호 컬럼

    @Column(nullable = false, length = 20)
    private String etype; // 이벤트 종류 컬럼

    // @Column의 속성 중 nullable을 생략할 경우 행당 컬럼은 null 허용으로 설정된다.
    @Column
    private String etitle; // 이벤트 제목 컬럼

    @Column
    private String estr; // 이벤트 상세 내용 컬럼

    @Column(nullable = false)
    private int eprice; // 이벤트 할인가 컬럼

    @Column
    private String eimg; // 이벤트 이미지 컬럼

    @Column
    private int eridx;  // Reservations 테이블의 외래키 역할 findByHridx 이용할 것

    @Transient
    private List<Reservations> erList;     //Event에서 사용할 Reservations 리스트

    @Transient
    private List<Files> efList;     //WeddingHall에서 사용할 파일 리스트
}
