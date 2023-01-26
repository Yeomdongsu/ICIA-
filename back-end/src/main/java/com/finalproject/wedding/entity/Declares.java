package com.finalproject.wedding.entity;

import lombok.Data;

import javax.persistence.*;
import java.util.List;

@Entity
@Data
@Table(name = "declares") // 신고 DB 관련 Entity
public class Declares {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int decidx; // 신고 구분 번호 컬럼

    @Column(nullable = false, length = 40)
    private String dectype; // 신고 종류 컬럼     ????댓글, 게시판 구분하려고만든건가?? 해놓은거보면 필요없을듯

    @Column
    private String decmid;    // 멤버테이블의 외래키 역할 findByRmid 이용할 것    해놓은거보면 필요없을듯
    @Column
    private String decbmid;      //신고당한사람아이디     //해놓은거보면 이것만 필요한가?
    @Column
    private Integer decbno;  //신고당한 게시판 번호 해놓은거보면 필요없을듯


//    @Transient                        필요없을듯함
//    private List<Board> DecbList;
//    @Transient
//    private List<Comment> DeccList;
    // 외래키
//    @ManyToOne
//    @JoinColumn(name = "mid",nullable = false)
//    private Member member; // member 테이블에서 가져온 외래키
//
//    @ManyToOne
//    @JoinColumn(name = "bno", nullable = true)
//    private Board board;  // board 테이블에서 가져온 외래키
//
//    @ManyToOne
//    @JoinColumn(name = "mentnum", nullable = true)
//    private Comment comment;  // declare 테이블에서 가져온 외래키
}
