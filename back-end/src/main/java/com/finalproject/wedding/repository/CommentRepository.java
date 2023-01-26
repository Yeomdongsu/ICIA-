package com.finalproject.wedding.repository;

import com.finalproject.wedding.entity.Board;
import com.finalproject.wedding.entity.Comment;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface CommentRepository extends CrudRepository<Comment, String> {
    Comment findByMentbno(int mentbno);

    @Query("SELECT c from Comment c WHERE c.mentbno=?1")
    List<Comment> findByMentbno2(int mentbno);

    @Query("DELETE From Comment c WHERE c.mentnum=?1")
    Comment deleteByMentnum(int mentnum);

    void deleteByMentbno(int mentbno);

}
