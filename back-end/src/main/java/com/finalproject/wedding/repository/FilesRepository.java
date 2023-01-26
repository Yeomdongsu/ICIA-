package com.finalproject.wedding.repository;

import com.finalproject.wedding.entity.Board;
import com.finalproject.wedding.entity.Files;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface FilesRepository extends CrudRepository<Files, Long> {
//    List<Files> findByFmid(int bno);

    List<Files> findByFid(int bno);

    List<Files> findByFtype(String type);

    List<Files> findByFidAndFtype(int bno, String type);
    // 게시글(board)에 해당하는 파일목록을 가져오는 메소드
//    List<Files> findByBoard(Board board);
//    List<Files> findByBfbid(int bno);
//
    // 게시글에 해당하는 파일목록 삭제
//    List<Files> deleteByBfbid(int bno);
    List<Files> deleteByFid(int bno);

    List<Files> findByFwhidx(int whidx);

    List<Files> findByFsidx(int sidx);

    List<Files> findByFhid(int hidx);
}
