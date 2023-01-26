package com.finalproject.wedding.entity;

import lombok.Data;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import javax.persistence.Id;
import java.sql.Time;
import java.sql.Timestamp;
import java.util.List;

@Entity
@Data
@Table(name = "comment") // 댓글 DB 관련 Entity
public class Comment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int mentnum; // 댓글 구분 번호 컬럼

    @Column(nullable = false)
    private String mentstr; // 댓글 상세 내용 컬럼

    @Column(nullable = false)
    @CreationTimestamp
    private Timestamp mentdate; // 댓글 작성 날짜 컬럼

    @Column
    private String mentmid;    // 회원 구분 컬럼 findByRmid 이용할 것    댓글작성자아이디들어감
    @Column
    private int mentbno;        //게시판 번호 구분 컬럼 findByMentbno 사용.

    @Transient
    private String mentstrup;

//    @Column                                           필요없을거같은거 지우고 하겟음
//    private String mentdecidx;
//    @Transient
//    private List<Board> mentbList;

    // 외래키
//    @ManyToOne
//    @JoinColumn(name = "mid", nullable = false)
//    private Member member;  // member 테이블에서 가져온 외래키
//
//    @OneToOne
//    @JoinColumn(name = "bno", nullable = false)
//    private Board board;  // board 테이블에서 가져온 외래키
}
