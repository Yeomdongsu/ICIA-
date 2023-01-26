package com.finalproject.wedding.entity;

import lombok.Data;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.DynamicInsert;

import javax.persistence.*;
import javax.transaction.Transactional;
import java.util.List;

@Entity
@Table(name = "member") // 회원 DB 관련 Entity
@Data
@DynamicInsert
public class Member {
    @Id
    @Column(nullable = false, length = 25)
    private String mid; // 회원 아이디 컬럼

    @Column(length = 100)
    private String mpwd; // 회원 비밀번호 컬럼

    @Column(length = 25)
    private String mname; // 회원 성명 컬럼

    @Column(length = 100)
    private String maddr; // 회원 주소 컬럼
    @Column(length = 100)
    private String mdaddr;  //상세주소 컬럼

    @Column(length = 20)
    private String mpid; // 회원 주민등록번호 컬럼

    @Column(length = 11)
    private String mphone; // 회원 연락처 컬럼
    @Column(length = 100)
    private String memail; // 회원 이메일 컬럼

    // String 값을 기본값으로 지정하고 싶을 경우 ColumnDefault 지정
    @Column(columnDefinition = "varchar(10) default 'user'")
    private String grade; // 회원 등급 컬럼

    @Column(columnDefinition = "int default 0")
    private int mresc; // 회원 예약 건 수 컬럼

    @Column(columnDefinition = "int default 0")
    private int mdec; // 회원 신고 당한 건 수 컬럼

    @Transient
    private List<Declares> dfList;
    // 윤희 - 회원 신고 내역 확인용

    @Transient
    private List<Reservations> rList;
    // 윤희 - 회원 예약 내역 확인용
}
