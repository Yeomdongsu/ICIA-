package com.finalproject.wedding.entity;

import lombok.Data;
import org.hibernate.annotations.ColumnDefault;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "weddingcomp") // 예식장 DB 관련 Entity
@Data
public class WeddingComp {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int widx; // 예식장 구분번호 컬럼

    @Column(nullable = false, length = 45)
    private String wlocation; // 예식장 위치 컬럼

    @Column(nullable = false, length = 45)
    private String wlocation2; // 예식장 상세 위치 컬럼

    @Column(nullable = false, length = 11)
    private String wphone; // 예식장 연락처 컬럼

    @Column(nullable = false, length = 45)
    private String wname; // 예식장 이름 컬럼

    @Column
    private String wimg; // 예식장 이미지 파일 컬럼

    @Transient
    private List<WeddingHall> wcwhList;
}
