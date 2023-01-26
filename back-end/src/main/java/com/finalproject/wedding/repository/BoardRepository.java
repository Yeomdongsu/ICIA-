package com.finalproject.wedding.repository;

import com.finalproject.wedding.entity.Board;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface BoardRepository extends CrudRepository<Board, Integer> {
    Page<Board> findByBtype(String type, Pageable pageable);

    Board findByBno(int bno);

    Page<Board> findByBnoGreaterThan(int bno, Pageable pageable);

    Page<Board> findByBnoGreaterThanAndBtypeContaining(int i, Pageable pb, String type);

    @Query("select b from Board b where b.btype=?1")
    List<Board> findByBtypes(String str);

    Board findByBnoAndBtype(int bno, String type);

    Board findByBnoAndBpwd(int bno, String pwd);

    @Query("select s from Board s where s.btype=?1 or s.btype=?2 or s.btype=?3 or s.btype=?4")
    Page<Board> findByBtypeMem(String 자랑할래요, String 추천할래요, String 업체후기톡톡, String 고민있어요, Pageable pb);

    Page<Board> findByBmidContaining(String searchId, Pageable pb);

    List<Board> findAllByBtype(String btype, Sort sort);

//    List<Board> findByBtitleContainingAndBtype(String content, String btype);
    Page<Board> findByBtitleContainingAndBtype(String content, String type, Pageable pageable);
}
