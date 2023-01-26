package com.finalproject.wedding.entity;

import lombok.Data;
import org.hibernate.annotations.ColumnDefault;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "planner") // 플래너 DB 관련 Entity
@Data
public class Planner {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int pidx; // 플래너 구분 번호 컬럼

    @Column(nullable = false, length = 10)
    private String pname; // 플래너 성명 컬럼

    @Column(nullable = false, length = 11)
    private String pphone; // 플래너 연락처 컬럼

    @Column(columnDefinition = "int default -1")
    private int pprice; // 플래너 가격 컬럼

    @Column(length = 5000)
    private String pstr; // 플래너 상세 내역 컬럼

    // 이미지 파일의 경우 String 형식으로 전달받아,
    // @Column 어노테이션의 columnDefinition보다는 @ColumnDefault를 사용해야 한다.
    @Column
    private String pimg; // 플래너 이미지 컬럼

    @Transient
    private List<Dib> pdList;     //Planner에서 사용할 Dib 리스트
    @Transient
    private Reservations prList;     //Planner에서 사용할 Reservations 리스트
    @Transient
    private List<Files> pfList;     //Planner에서 사용할 파일 리스트
}
