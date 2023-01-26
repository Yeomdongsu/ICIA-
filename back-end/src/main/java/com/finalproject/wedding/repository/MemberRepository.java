package com.finalproject.wedding.repository;

import com.finalproject.wedding.entity.Member;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;

import org.springframework.data.repository.CrudRepository;

import java.util.List;
import java.util.Optional;

public interface MemberRepository extends CrudRepository<Member, String> {
//    Optional<Member> findByMid(String mid);

    Member findByMpid(String mpid);

    Member findByMidAndMphone(String mid, String mphone);

    Member findByMnameAndMpid(String mname, String mpid);
    
    Page<Member> findByGrade(String user, Pageable pageable);

    @Query("SELECT c from Member c WHERE c.mid=?1")
    Member findByMid(String mid);
}
